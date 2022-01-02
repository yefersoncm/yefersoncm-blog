import '@polymer/iron-icon';
import '@vaadin/button';
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import { Binder, field } from '@vaadin/form';
import '@vaadin/form-layout';
import { EndpointError } from '@vaadin/fusion-frontend';
import '@vaadin/grid';
import { Grid, GridDataProviderCallback, GridDataProviderParams } from '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sort-column';
import '@vaadin/horizontal-layout';
import '@vaadin/notification';
import { Notification } from '@vaadin/notification';
import '@vaadin/polymer-legacy-adapter';
import '@vaadin/split-layout';
import '@vaadin/text-field';
import '@vaadin/email-field';
import '@vaadin/upload';
import '@vaadin/vaadin-icons';
import Sort from 'Frontend/generated/com/vaadin/fusion/mappedtypes/Sort';
import Users from 'Frontend/generated/com/yefersoncm/app/data/entity/Users';
import UsersModel from 'Frontend/generated/com/yefersoncm/app/data/entity/UsersModel';
import Rol from 'Frontend/generated/com/yefersoncm/app/data/entity/Rol';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import * as UsersEndpoint from 'Frontend/generated/UsersEndpoint';
import * as RolesEndpoint from 'Frontend/generated/RolesEndpoint';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { View } from '../view';

@customElement('users-view')
export class UsuariosView extends View {
  @query('#grid')
  private grid!: Grid;

  @property({ type: Number })
  private gridSize = 0;

  @state()
  private roles: Rol[] = [];

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Users, UsersModel>(this, UsersModel);

  render() {
    return html`
      <vaadin-split-layout class="w-full h-full">
        <div class="flex-grow w-full">
          <vaadin-grid
            id="grid"
            class="w-full h-full"
            theme="no-border"
            .size=${this.gridSize}
            .dataProvider=${this.gridDataProvider}
            @active-item-changed=${this.itemSelected}
          >
            <vaadin-grid-sort-column auto-width path="id"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="name"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="lastname"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="email"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="phone" ></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="dateofbirth" header="Date Of Birth"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="rol.name" header="Rol"></vaadin-grid-sort-column>
            <vaadin-grid-column auto-width path="active"
              ><template
                ><iron-icon
                  hidden="[[!item.active]]"
                  icon="vaadin:check"
                  style="width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: var(--lumo-primary-text-color);"
                >
                </iron-icon>
                <iron-icon
                  hidden="[[item.active]]"
                  icon="vaadin:minus"
                  style="width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: var(--lumo-disabled-text-color);"
                >
                </iron-icon></template
            ></vaadin-grid-column>
          </vaadin-grid>
        </div>
        <div class="flex flex-col" style="width: 400px;">
          <div class="p-l flex-grow">
            <vaadin-form-layout>
              <vaadin-text-field required label="Name" id="name" ${field(this.binder.model.name)}  ></vaadin-text-field>
              <vaadin-text-field required label="Lastname" id="lastname" ${field(this.binder.model.lastname)}></vaadin-text-field>
              <vaadin-email-field required label="Email" id="email" ${field(this.binder.model.email)}></vaadin-email-field>
              <vaadin-text-field  label="Phone" id="phone" ${field(this.binder.model.phone)}></vaadin-text-field>
              <vaadin-date-picker required label="Date of birth" id="dateofbirth" ${field(this.binder.model.dateofbirth)}></vaadin-date-picker>
              <vaadin-combo-box .items=${this.roles} label="Rol" id="rol"  ${field(this.binder.model.rol)} item-label-path="name" item-value-path="id"></vaadin-combo-box>
              <vaadin-checkbox id="activo" ${field(this.binder.model.active)} style="padding-top: var(--lumo-space-m);">Active</vaadin-checkbox>
            </vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout class="w-full flex-wrap bg-contrast-5 py-s px-l" theme="spacing">
            <vaadin-button theme="primary" @click=${this.save}>Save</vaadin-button>
            <vaadin-button theme="tertiary" @click=${this.cancel}>Cancel</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }

  private async getGridData(
    params: GridDataProviderParams<Users>,
    callback: GridDataProviderCallback<Users | undefined>
  ) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await UsersEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'flex-col', 'h-full');
    this.gridSize = (await UsersEndpoint.count()) ?? 0;
    this.roles = await RolesEndpoint.listAll();
  }

  private async itemSelected(event: CustomEvent) {
    const item: Users = event.detail.value as Users;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await UsersEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      const isNew = !this.binder.value.id;
      await this.binder.submitTo(UsersEndpoint.update);
      if (isNew) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      Notification.show(`Usuario guardado correctamente`, { theme: 'primary', position: 'bottom-start' });
    } catch (error: any) {
      if (error instanceof EndpointError) {
        Notification.show(`No se pudo guardar el usuario`, { theme: 'error', position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private cancel() {
    this.grid.activeItem = undefined;
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid() {
    this.grid.selectedItems = [];
    this.grid.clearCache();
  }
  
}


