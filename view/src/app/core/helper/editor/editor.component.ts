import { Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { isNullOrUndefined } from 'util';
declare const tinymce: any;


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'text-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
}) export class EditorComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {


  @Input() elementId: string;
  @Input() value: any = '';
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onEditorKeyup: EventEmitter<any> = new EventEmitter<any>();

  baseURL = '/';
  didSetValue = false;



  constructor() {
  }


  ngOnInit() {


  }

  // plugins: ['link', 'paste', 'table', 'image'],
  // tslint:disable-next-line:member-ordering
  editor;

  ngAfterViewInit() {
    tinymce.init({
      height: "325",
      selector: '#' + this.elementId,
      paste_data_images: true,
      theme: 'modern',
      // plugins: ['link', 'paste', 'table','image', 'imagetools','searchreplace'],
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern'
      ],
      // tslint:disable-next-line:max-line-length
      toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      toolbar2: 'print preview media | forecolor backcolor emoticons | imagetools | importcss',
      image_advtab: true,
      image_caption: true,
      image_dimensions: true,

      // tslint:disable-next-line:max-line-length
      skin_url: this.baseURL + 'assets/skins/lightgray',
      automatic_uploads: true,
      file_picker_types: 'image',
      file_picker_callback: function (cb, value, meta) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');



        input.onchange = function () {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = function () {
            const id = 'blobid' + (new Date()).getTime();
            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
            const base64 = reader.result.split(',')[1];
            const blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            // call the callback and populate the Title field with the file name
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };

        input.click();
      },
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }



  ngOnChanges() {

    //console.log(this.value);

    if (!isNullOrUndefined(this.editor) && this.value !== "" && !this.didSetValue) {

      //console.log(this.value);
      this.didSetValue = true;
      this.editor.setContent(this.value);


    }
  }

}
