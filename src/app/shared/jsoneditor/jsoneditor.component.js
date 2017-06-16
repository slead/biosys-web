"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// TODO: why the jsoneditor with ace breaks when bundled. Also the css can't find the icons.svg file
var JSONEditor = require('jsoneditor');
require("jsoneditor/dist/jsoneditor.min.css");
var JsonEditorComponent = (function () {
    function JsonEditorComponent(rootElement) {
        this.rootElement = rootElement;
    }
    JsonEditorComponent.prototype.ngOnInit = function () {
        if (null === this.options) {
            throw new Error('"options" is required');
        }
        if (null === this.data) {
            this.data = {};
        }
        this.editor = new JSONEditor(this.rootElement.nativeElement, this.options, this.data);
    };
    JsonEditorComponent.prototype.collapseAll = function () {
        this.editor.collapseAll();
    };
    JsonEditorComponent.prototype.destroy = function () {
        this.editor.destroy();
    };
    JsonEditorComponent.prototype.expandAll = function () {
        this.editor.expandAll();
    };
    JsonEditorComponent.prototype.focus = function () {
        this.editor.focus();
    };
    JsonEditorComponent.prototype.set = function (json) {
        this.editor.set(json);
    };
    JsonEditorComponent.prototype.setMode = function (mode) {
        this.editor.setMode(mode);
    };
    JsonEditorComponent.prototype.setName = function (name) {
        this.editor.setName(name);
    };
    JsonEditorComponent.prototype.setSchema = function (schema) {
        this.editor.setSchema(schema);
    };
    JsonEditorComponent.prototype.get = function () {
        return this.editor.get();
    };
    JsonEditorComponent.prototype.getMode = function () {
        return this.editor.getMode();
    };
    JsonEditorComponent.prototype.getName = function () {
        return this.editor.getName();
    };
    JsonEditorComponent.prototype.getText = function () {
        return this.editor.getText();
    };
    return JsonEditorComponent;
}());
__decorate([
    core_1.Input('options')
], JsonEditorComponent.prototype, "options", void 0);
__decorate([
    core_1.Input('data')
], JsonEditorComponent.prototype, "data", void 0);
JsonEditorComponent = __decorate([
    core_1.Component({
        selector: 'biosys-json-editor',
        template: "<div></div>",
    })
], JsonEditorComponent);
exports.JsonEditorComponent = JsonEditorComponent;
