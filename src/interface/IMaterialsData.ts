export default interface IMaterialsData {
  materials: Object;
  metadatas: IMetaDatas[];
}

interface IMetaDatas {
  group: IMaterialsGroup;
}

interface IMaterialsGroup {
  label: string;
  icon: string;
  components: IMaterialsComponent[];
}

interface IMaterialsComponent {
  title: string;
  key: string;
  id: string;
  render: IMataData;
  preview: IMataData;
}

interface IMataData {
  style: Object;
  props: Object;
  slotContent?: string;
}