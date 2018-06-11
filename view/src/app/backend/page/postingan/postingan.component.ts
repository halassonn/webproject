import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PostModel } from '../../../core/model/post.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../../core/shared/post.service';
import { LoaderService } from '../../../core/helper/_http/loader/loader.service';
declare const tinymce: any;
@Component({
  selector: 'app-postingan',
  templateUrl: './postingan.component.html',
  styleUrls: ['./postingan.component.scss']
})
export class PostinganComponent implements OnInit {

  title: any;
  postbody: any;
  statuspost = { issave: true, ispublish: false };

  post: PostModel = new PostModel();
  posts: PostModel[];
  formPost: FormGroup;

  isOpenModal = false;
  modalConfig = {
    backdrop: false,
    ignoreBackdropClick: true,
    class: 'modal-lg-custome'
  };

  editorInit: any;
  addkategory = false;
  addPost = false;
  kategory = '';

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formPost = this.fb.group(
      {
        'id': [''],
        'title': [''],
        'postbody': [this.postbody]
      }
    );
  }

  _onSelectKategory(e) {
    // if (this.halamanmodel.urlmenu === undefined) {
    if (e.target.value !== '0') {
      this.post.kategory = (e.target.value).toLowerCase();
      this.addkategory = false;
    } else {
      this.kategory = '';
      this.addkategory = true;
    }
  }

  async _onSavePost() {
    const content = tinymce.get('ideditor').getContent();
    this.post.postcontent = content;

    this.loaderService.status('Saving data .....');
    this.loaderService.loaderOpen();
    setTimeout(() => {
      this.postService.save('api/post', this.post).subscribe(
        (response) => {
          console.log(response);
          this.loaderService.loaderclose();
        }, (error) => {
          console.error(error);
          this.loaderService.loaderclose();
        }
      );
    }, 1000);
  }

  _onBodyTextEditorKeyUp() {
    this.postbody = tinymce.get('ideditor').getContent();
  }



  _newKategory(e) {
    const x = e.target.value.toLowerCase();
    this.post.kategory = x;
  }

  openModal(modal) {
    this.post = new PostModel;
    modal.show();
    this.buildForm();
  }
  submitpost(e) {
    this.post = e.value;
    this.post.postcontent = this.postbody;
    console.log(this.post);

  }


}
