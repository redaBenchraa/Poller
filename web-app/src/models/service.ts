export default interface Service {
  id?: string;
  url: string;
  name: string;
  alive?: boolean;
  creationTime?: Date;
}
