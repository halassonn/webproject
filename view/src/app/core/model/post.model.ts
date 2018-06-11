export class PostModel {
  id: String;
  kategory: String;
  title: String;
  postcontent: String;
  status: Boolean = false;
  createat: Date = new Date();
  updateat: Date = new Date();
  publishat: Date;
}


