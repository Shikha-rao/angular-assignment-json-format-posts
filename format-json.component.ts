import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-format-json',
  templateUrl: './format-json.component.html',
  styleUrls: ['./format-json.component.css']
})
export class FormatJsonComponent implements OnInit {


  @ViewChild('JsonEditorComponent',{static:true}) editor:JsonEditorComponent;
  @ViewChild('inputData',{static:false}) inputData:ElementRef;
  options = new JsonEditorOptions();
  outputjson

  constructor() {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];

    this.options.statusBar = false;
    this.options.onChange = () => console.log(this.editor.get());

  }


  ngOnInit() {
  }
  inputChange(){
   let abc = this.inputData.nativeElement.value;

    this.outputjson = JSON.parse(JSON.stringify(abc));
    // this.options.schema = this.outputjson;
    console.log(this.outputjson);

  }

}
