export interface IMaterialsData {
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

export interface IMaterialsComponent {
  title: string;
  key: string;
  id: string;
  render: IMataData;
  preview: IMataData;
}

interface IMataData {
  style: any;
  props: Object;
  slotContent?: string;
  alignCenter?: boolean;
  fullWidth?: boolean;
}