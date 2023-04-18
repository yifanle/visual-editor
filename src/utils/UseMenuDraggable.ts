import { IMaterialsComponent } from '@/interface/IMaterialsData';
 
export default class UseMenuDraggable {
  private canvasContainer: any;
  private data: any;
  private currentComponent: IMaterialsComponent = {} as IMaterialsComponent;
  constructor(canvasContainer:any,data:any) {
    this.canvasContainer = canvasContainer;
    this.data = data;
  }
  private dragenter = (e: any) => {
    e.dataTransfer.dropEffect = 'move';
  }

  private dragover = (e: any) => {
    e.preventDefault();
  }

  private dragleave = (e: any) => {
    e.dataTransfer.dropEffect = 'none';
  }

  private drop = (e: any) => {
    let blocks = this.data.value.blocks;
    this.data.value = {
      ...this.data.value,
      blocks: [
        ...blocks,
        {
          id: this.currentComponent.id + new Date().getTime(),
          key: this.currentComponent.key,
          props: this.currentComponent.render.props,
          style: {
            ...this.currentComponent.render.style,
            top: e.offsetY + 'px',
            left: this.currentComponent.render.fullWidth ? this.currentComponent.render.style?.left : e.offsetX + 'px',
            "z-index": 1
          },
          slotContent: this.currentComponent.render.slotContent,
          alignCenter: this.currentComponent.render.alignCenter,
        }
      ]
    }
    this.currentComponent = {} as IMaterialsComponent;
  }

  setCurrentComponent = (component: IMaterialsComponent) => {
    this.currentComponent = component;
  }

  onDragstart = () => {
    this.canvasContainer.value.addEventListener('dragenter', this.dragenter);
    this.canvasContainer.value.addEventListener('dragover', this.dragover);
    this.canvasContainer.value.addEventListener('dragleave', this.dragleave);
    this.canvasContainer.value.addEventListener('drop', this.drop);
  }
  onDragend = () => {
    this.canvasContainer.value.removeEventListener('dragenter', this.dragenter);
    this.canvasContainer.value.removeEventListener('dragover', this.dragenter);
    this.canvasContainer.value.removeEventListener('dragleave', this.dragenter);
    this.canvasContainer.value.removeEventListener('drop', this.dragenter);
  }
}