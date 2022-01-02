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
import '@vaadin/combo-box';
import '@vaadin/icon';
import '@vaadin/icons';
import { RichTextEditor } from '@vaadin/rich-text-editor'
import '@vaadin/rich-text-editor';
import '@vaadin/upload';
import '@vaadin/vaadin-icons';
import '@vaadin/upload';
import type { Upload, UploadFileRejectEvent, UploadI18n } from '@vaadin/upload';
import Users from 'Frontend/generated/com/yefersoncm/app/data/entity/Users';
import Status from 'Frontend/generated/com/yefersoncm/app/data/entity/Status';
import Sort from 'Frontend/generated/com/vaadin/fusion/mappedtypes/Sort';
import Post from 'Frontend/generated/com/yefersoncm/app/data/entity/Post';
import PostModel from 'Frontend/generated/com/yefersoncm/app/data/entity/PostModel';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import * as PostsEndpoint from 'Frontend/generated/PostsEndpoint';
import * as UsersEndpoint from 'Frontend/generated/UsersEndpoint';
import * as StatusEndpoint from 'Frontend/generated/StatusEndpoint';
import * as CategoriesEndpoint from 'Frontend/generated/CategoriesEndpoint';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { View } from '../view';
import Category from 'Frontend/generated/com/yefersoncm/app/data/entity/Category';

@customElement('posts-view')
export class PostsView extends View {
  @query('#grid')
  private grid!: Grid;

  @query('vaadin-upload')
  private upload?: Upload;

  @query('vaadin-rich-text-editor')
  private richTextEditor!: RichTextEditor;


  @property({ type: Number })
  private gridSize = 0;

  @state()
  private htmlValue = '';

  @state()
  private authors: Users[] = [];

  @state()
  private statuses: Status[] = [];

  @state()
  private categories: Category[] = [];

  private maxFiles =1;

  private maxFileSizeInMB = 2;
  private maxFileSizeInBytes = this.maxFileSizeInMB * 1024 * 1024;
  private acceptedTypes = [
      '.jpg',
      '.png',
      '.jpeg',
    ];

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Post, PostModel>(this, PostModel);



  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.one = 'Sube imagen de portada...';
      this.upload.i18n.dropFiles.one = 'Suelta la imagen aqui';
      this.upload.i18n.error.fileIsTooBig='El archivo excede el maximo permitido de '+this.maxFileSizeInMB+' MB';
      this.upload.i18n.error.incorrectFileType =
        'Porfavor suba una imagen en los formatos soportados (.jpg, .png, .jpeg).';
      this.upload.i18n = { ...this.upload.i18n };

    }
  }

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
            <vaadin-grid-sort-column auto-width path="title"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="tags"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="author.fullname" header="Author"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="status.name" header="Status"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="category.name" header="Category"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div >
          <vaadin-text-field ${field(this.binder.model.title)} class="w-full" style="max-width: 100%" aria-label="titulo" placeholder="Titulo">
            <vaadin-icon icon="vaadin:copy-o" slot="prefix"></vaadin-icon>
          </vaadin-text-field>
          <vaadin-text-area ${field(this.binder.model.description)} class="w-full" style="max-width: 100%" aria-label="descripcion" placeholder="Descripcion">
            <vaadin-icon icon="vaadin:angle-right" slot="prefix"></vaadin-icon>
          </vaadin-text-area>
          <vaadin-text-field  ${field(this.binder.model.tags)}class="w-full" style="max-width: 100%" aria-label="tag" placeholder="Tags">
            <vaadin-icon icon="vaadin:tags" slot="prefix"></vaadin-icon>
          </vaadin-text-field>
          <vaadin-rich-text-editor  @change="${this.syncHtmlValue}" theme="no-border" ${field(this.binder.model.body)} class="w-full" style="max-height: 100rm" .items=${this.htmlValue}></vaadin-rich-text-editor>
          <!-- Debo configurar el target donde se cargara la imagen en el servidor -->
          <!-- <vaadin-upload
            ${field(this.binder.model.imagepath)}
            target="http://localhost:8080/api/fileupload"
            .maxFiles=${this.maxFiles}
            class="w-full"
            .maxFileSize="${this.maxFileSizeInBytes}"
            .accept="${this.acceptedTypes.join(',')}"
            @file-reject="${this.fileRejectHandler}">
          </vaadin-upload> -->
          <vaadin-text-field ${field(this.binder.model.imagepath)} class="w-full" style="max-width: 100%" aria-label="url" placeholder="image url"></vaadin-text-field>
          <vaadin-combo-box 
            ${field(this.binder.model.author)}
            class="w-full"
            .items=${this.authors} 
            label="Author" 
            id="autor"  
            item-label-path="fullname" 
            item-value-path="id">
        </vaadin-combo-box>
        <vaadin-combo-box 
            ${field(this.binder.model.status)}
            class="w-full"
            .items=${this.statuses} 
            label="Status" 
            id="estado"  
            item-label-path="name" 
            item-value-path="id">
        </vaadin-combo-box>
        <vaadin-combo-box 
            ${field(this.binder.model.category)}
            class="w-full"
            .items=${this.categories} 
            label="Category" 
            id="category"  
            item-label-path="name" 
            item-value-path="id">
        </vaadin-combo-box>
          <vaadin-horizontal-layout class="w-full flex-wrap bg-contrast-5 py-s px-l" theme="spacing">
            <vaadin-button theme="primary" @click=${this.save}>Save</vaadin-button>
            <vaadin-button theme="tertiary" @click=${this.cancel}>Cancel</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
        
      </vaadin-split-layout>
    `;
  }
  fileRejectHandler(event: UploadFileRejectEvent) {
    Notification.show(event.detail.error);
  }

  private async getGridData(
    params: GridDataProviderParams<Post>,
    callback: GridDataProviderCallback<Post | undefined>
  ) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await PostsEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'flex-col', 'h-full');
    this.gridSize = (await PostsEndpoint.count()) ?? 0;
    this.authors = await UsersEndpoint.listAll();
    this.statuses = await StatusEndpoint.listAll();
    this.categories = await CategoriesEndpoint.listAll();

  }

  private async itemSelected(event: CustomEvent) {
    const item: Post = event.detail.value as Post;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await PostsEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      const isNew = !this.binder.value.id;
      await this.binder.submitTo(PostsEndpoint.update);
      if (isNew) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      Notification.show(`Posts details stored.`, { theme: 'primary', position: 'bottom-start' });
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

  syncHtmlValue() {
    this.htmlValue = this.richTextEditor.htmlValue || '';
  }
}
