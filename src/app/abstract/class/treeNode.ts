export class dataTreeM {
  code: String;
  desc: String;
  yeari: Array<any>;
  
    constructor(){
      this.code = "";
      this.desc = "";
      this.yeari = new Array<any>();
    }
  }

export class TreeNodeM {
  data?: dataTreeM;
  children?: TreeNodeM[];
  leaf?: boolean;
  expanded?: boolean;

  constructor(){
    this.data = new dataTreeM;
    this.children = new Array<TreeNodeM>();
  }
}

export class dataTree {
  code: String;
  desc: String;
  saldoInicial: Number;
  debe: Number;
  haber: Number;
  saldoActual: Number;
  
    constructor(){
      this.code = "";
      this.desc = "";
      this.saldoInicial = 0;
      this.debe = 0;
      this.haber = 0;
      this.saldoActual = 0;
    }
  }

  export class TreeNode {
    data?: dataTree;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
  
    constructor(){
      this.data = new dataTree;
      this.children = new Array<TreeNode>();
    }
  }