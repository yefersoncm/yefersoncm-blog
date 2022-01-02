import '@vaadin/horizontal-layout';
import '@vaadin/polymer-legacy-adapter';
import '@vaadin/select';
import '@vaadin/vertical-layout';
import Post from 'Frontend/generated/com/yefersoncm/app/data/entity/Post';
import { PostsEndpoint } from 'Frontend/generated/endpoints';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';

@customElement('blog-view')
export class BlogView extends View {
  @state()

  
  private posts: Post[] = [];

  render() {
    return html`
      <main class="max-w-screen-lg mx-auto pb-l px-l">
        <ol class="gap-m grid list-none m-1 p-1">
          ${this.posts.map(
            (post) => html`
              <li class="bg-contrast-5 flex flex-col items-start p-m rounded-l">
                <div
                  class="bg-contrast flex items-center justify-center mb-m overflow-hidden rounded-m w-full"
                  style="height: 160px;"
                >
                  <img alt=${post.title} class="w-full" loading="lazy" src="${post.imagepath}" />
                </div>
                <span class="text-xl font-semibold">${post.title}</span>
                <span class="text-s text-secondary">${post.author.fullname}</span>
                <p class="my-m" align="justify">
                  ${post.description}
                </p>
                <span theme="badge"><i class="${post.category.icon}"></i></span>
              </li>
            `
          )}
        </ol>
      </main>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'flex-col', 'h-full');
    this.posts = await PostsEndpoint.listPublished();
    this.posts.sort((a, b) => a.createdAt! > b.createdAt! ? -1 : 1)
  }
  
}
