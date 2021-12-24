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
import '@vaadin/upload';
import '@vaadin/vaadin-icons';
import Sort from 'Frontend/generated/com/vaadin/fusion/mappedtypes/Sort';
import Usuarios from 'Frontend/generated/com/yefersoncm/app/data/entity/Usuarios';
import UsuariosModel from 'Frontend/generated/com/yefersoncm/app/data/entity/UsuariosModel';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import * as UsuariosEndpoint from 'Frontend/generated/UsuariosEndpoint';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { View } from '../view';

@customElement('usuarios-view')
export class UsuariosView extends View {
  @query('#grid')
  private grid!: Grid;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Usuarios, UsuariosModel>(this, UsuariosModel);

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
            <vaadin-grid-sort-column auto-width path="nombre"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="apellido"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="correo"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="telefono"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="fechaDeNacimiento"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="rol"></vaadin-grid-sort-column>
            <vaadin-grid-column auto-width path="activo"
              ><template
                ><iron-icon
                  hidden="[[!item.activo]]"
                  icon="vaadin:check"
                  style="width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: var(--lumo-primary-text-color);"
                >
                </iron-icon>
                <iron-icon
                  hidden="[[item.activo]]"
                  icon="vaadin:minus"
                  style="width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: var(--lumo-disabled-text-color);"
                >
                </iron-icon></template
            ></vaadin-grid-column>
            <vaadin-grid-sort-column auto-width path="createdAt"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="updatedAt"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div class="flex flex-col" style="width: 400px;">
          <div class="p-l flex-grow">
            <vaadin-form-layout
              ><vaadin-text-field label="Nombre" id="nombre" ${field(this.binder.model.nombre)}></vaadin-text-field
              ><vaadin-text-field
                label="Apellido"
                id="apellido"
                ${field(this.binder.model.apellido)}
              ></vaadin-text-field
              ><vaadin-text-field label="Correo" id="correo" ${field(this.binder.model.correo)}></vaadin-text-field
              ><vaadin-text-field
                label="Telefono"
                id="telefono"
                ${field(this.binder.model.telefono)}
              ></vaadin-text-field
              ><vaadin-date-picker
                label="Fecha de nacimiento"
                id="fechaDeNacimiento"
                ${field(this.binder.model.fechaDeNacimiento)}
              ></vaadin-date-picker
              ><vaadin-text-field label="Rol" id="rol" ${field(this.binder.model.rol)}></vaadin-text-field
              ><vaadin-checkbox id="activo" ${field(this.binder.model.activo)} style="padding-top: var(--lumo-space-m);"
                >Activo</vaadin-checkbox
              ><vaadin-date-time-picker
                label="Created at"
                id="createdAt"
                step="1"
                ${field(this.binder.model.createdAt)}
              ></vaadin-date-time-picker
              ><vaadin-date-time-picker
                label="Updated at"
                id="updatedAt"
                step="1"
                ${field(this.binder.model.updatedAt)}
              ></vaadin-date-time-picker
            ></vaadin-form-layout>
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
    params: GridDataProviderParams<Usuarios>,
    callback: GridDataProviderCallback<Usuarios | undefined>
  ) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await UsuariosEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'flex-col', 'h-full');
    this.gridSize = (await UsuariosEndpoint.count()) ?? 0;
  }

  private async itemSelected(event: CustomEvent) {
    const item: Usuarios = event.detail.value as Usuarios;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await UsuariosEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      const isNew = !this.binder.value.id;
      await this.binder.submitTo(UsuariosEndpoint.update);
      if (isNew) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      Notification.show(`Usuarios details stored.`, { position: 'bottom-start' });
    } catch (error: any) {
      if (error instanceof EndpointError) {
        Notification.show(`Server error. ${error.message}`, { theme: 'error', position: 'bottom-start' });
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
