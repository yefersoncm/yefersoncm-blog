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
import '@vaadin/text-area';
import '@vaadin/upload';
import '@vaadin/vaadin-icons';
import * as CategoriesEndpoint from 'Frontend/generated/CategoriesEndpoint';
import Sort from 'Frontend/generated/com/vaadin/fusion/mappedtypes/Sort';
import Category from 'Frontend/generated/com/yefersoncm/app/data/entity/Category';
import CategoryModel from 'Frontend/generated/com/yefersoncm/app/data/entity/CategoryModel';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { View } from '../view';

@customElement('categories-view')
export class CategoriasView extends View {
  @query('#grid')
  private grid!: Grid;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Category, CategoryModel>(this, CategoryModel);

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
            <vaadin-grid-sort-column auto-width path="description"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="icon"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div class="flex flex-col" style="width: 400px;">
          <div class="p-l flex-grow">
            <vaadin-form-layout
              ><vaadin-text-field label="Nombre" id="nombre" ${field(this.binder.model.name)}></vaadin-text-field
              ><vaadin-text-area
                label="Descripcion"
                id="descripcion"
                ${field(this.binder.model.description)}
              ></vaadin-text-area
            >
            <vaadin-text-field
                label="Icon"
                id="icon"
                ${field(this.binder.model.icon)}
              ></vaadin-text-field
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
    params: GridDataProviderParams<Category>,
    callback: GridDataProviderCallback<Category | undefined>
  ) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await CategoriesEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'flex-col', 'h-full');
    this.gridSize = (await CategoriesEndpoint.count()) ?? 0;
  }

  private async itemSelected(event: CustomEvent) {
    const item: Category = event.detail.value as Category;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await CategoriesEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      const isNew = !this.binder.value.id;
      await this.binder.submitTo(CategoriesEndpoint.update);
      if (isNew) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      Notification.show(`Categorias details stored.`, { position: 'bottom-start' });
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
