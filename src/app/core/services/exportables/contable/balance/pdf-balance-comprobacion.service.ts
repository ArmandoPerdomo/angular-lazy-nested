import {Injectable} from '@angular/core';
import { ExportService, imagenconstr } from '../../parent/export.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfBalanceComprobacionService extends ExportService {

  constructor() {
    super();
  }
  
  getMonto(data: any, desc: any = ''){
    let acum: Number = 0
      data.forEach(a =>{
        if(a.data.desc == desc)
          acum = a.data.saldoActual;
      })
      return acum;
  }

  getAcum(data: any, monto: any = ''): number {
    let acum: number = 0;
      data.forEach(a => {
          acum += +a.data[monto];
      });
      return acum;
  }

  getIngresoEgreso(dataOut){
    let acum: Number = 0
    let ing: Number = 0
    let egr: Number = 0
    if (dataOut.length != 0){
      dataOut.forEach(a =>{
        if(a.data.desc == "INGRESOS")
          ing = a.data.saldoActual;
        if(a.data.desc == "COSTOS" || a.data.desc == "GASTOS" )
          egr =  +egr  + +a.data.saldoActual;
      })
      acum =  +ing - +egr;
    }
      return acum;
  }



  public pdfComprobacion(dout: any[], din: any) {
    var self = this;
    var dd = {
      info: 
      {
          title: 'Balance de comprobación'
       },
      header: function(currentPage, pageCount){/*Tabla del header*/
          return {
              table: {
            widths: ['20%','55%','25%'],
            heights:['auto','auto','auto'],
          body: 
          [
            [//Primera fila
                {//Imagen
                    image:imagenconstr,
                    width: 140,
                    height:80
                },
                {//Membrete
                    text:'\nAv. Los Pinos, entre calle Pomagas y Los Mangos,Casa Nro. 35 Urb. La Florida Norte, Zona Portal 1050 Ofi. +58212731.2087',
                    alignment:'center', fontSize:12
                },
                {//Detalles
                    columns:[
                       [//Fila
                            '\n\n',
                          {text:'Fecha:', bold:'true'},
                          {text:'Hora:', bold:'true'},
                          {text:'Página:', bold:'true'},
                            
                       ],
                          [
                              '\n\n',
                            self.currentDate[0],
                            self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                             currentPage.toString()+'/'+ pageCount.toString() 
                          ]
                        ],
                        alignment:'left', margin : [20,5,5,5]
                }
            ],//Fin Primera Fila
               [ //Segunda fila
                  {
                    text: 'DOCUMENTO DE BALANCE DE COMPROBACIÓN (Orden: Código)',
                    style: 'header',
                    colSpan: 3,
                    alignment: 'center'
                  }, {}, {}
                ], //Fin Segunda Fila
                  [//4ta fila
              {
                   style: 'tableExample',
                   
                   table: 
                   {
  
                     widths: [45, 185, 70,75,75,75],
                          body: 
                          [
                            [
                                {text: 'Código', bold: 'true', border:[false,true,false,true]},
                                {text: 'Descripción', bold: 'true', border:[false,true,false,true]},
                                {text: 'Saldo Inicial', alignment:'right', bold: 'true', border:[false,true,false,true]},
                                {text: 'Debe', bold: 'true', alignment:'right', border:[false,true,false,true]},
                                {text: 'Haber', bold: 'true',alignment:'right', border:[false,true,false,true]},
                                {text: 'Saldo Actual',alignment:'right', bold: 'true', border:[false,true,false,true]},
                            ],
  
                          ]
                        },colSpan: 3,
               }
                   , {}, {}
            ]//Fin 4ta Fila
  
                  
  
          ]
        },
        layout: 'noBorders',
              style: 'headerTable'
          }
      },
    content: [

      self.buildBody(dout, din),

  
  
    ],
    styles: {
      headerTable:{
          margin: [15, 10, 10,8]
      },

      header: {
        fontSize: 16,
        bold: true,
        alignment: 'justify'
      }
    
      },
      pageSize: 'LETTER',
      pageMargins: [15, 140, 10, 20],//Content margins
      defaultStyle: {
          fontSize: 8
      }
    
  }

    pdfMake.createPdf(dd).open();
  }

 


  buildBody(dat, din) {
    var body = []
    var layout =  {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0 : 1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
      },
      hLineColor: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 'white' : 'gray';
      },
      vLineColor: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
      },
      paddingLeft: function(i, node) { return 0; },
			paddingRight: function(i, node) { return 0; },
			paddingTop: function(i, node) { return 2; },
			paddingBottom: function(i, node) { return 2; },
    }
    var layout2 =  {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0 : 1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
      },
      hLineColor: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 'white' : 'gray';
      },
      vLineColor: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
      },
      paddingLeft: function(i, node) { return 0; },
			paddingRight: function(i, node) { return 0; },
			paddingTop: function(i, node) { return 2; },
      paddingBottom: function(i, node) { return 2; },
      fillColor: function (i, node) {
        return (i % 2 === 0) ? '#CCCCCC' : null;
      }
    }
    var vacio = [{},{},{},{},{},{}];
    var total = [];
    var totalBalance = [];
    var objtablBalance = {
      table:
      {
        widths:[35  , 85, 85, 85, 85, 125],
        body:[]
      }, layout: 'lightHorizontalLines'
    }
    var objtabletotal = {
      table:
      {
        widths:  [60, 180, 85, 85, 85, 85],
        body:[]
      }, layout: layout2
    }

    dat.forEach(a => {
     
      var objtable1 = {
        table:
        {
          widths:  [60, 180, 85, 85, 85, 85],
          body:[]
        }, layout: layout
      }
      var objtable2 = {
        table:
        {
          widths:  [60, 180, 85, 85, 85, 85],
          body:[]
        }, layout: layout, colSpan: 3
      }
      
      // Creando rows para la tabla 
      var rowFirst1 = [];
      var rowFirst2 = [];
      var rowFirst3 = [];

      if (a.children.length == 0 || a.children == [] && din.Nivel == 1)
      {
        //! 1 NIVEL
        //insertando Informacion nivel 1
        if(din.Nivel == 1){
          rowFirst1.push(
            {text:a.data.code},
            {text:a.data.desc},
            {text: this.moneyTrans(a.data.saldoInicial),alignment:'right'},
            {text: this.moneyTrans(a.data.debe),alignment:'right'},
            {text: this.moneyTrans(a.data.haber),alignment:'right'},
            {text: this.moneyTrans(a.data.saldoActual),alignment:'right'}  
          ) 
        }else{
          
          rowFirst1.push(
            {text:a.data.code, bold:true},
            {text:a.data.desc, bold:true},
            {text: this.moneyTrans(a.data.saldoInicial),bold: true,alignment:'right'},
            {text: this.moneyTrans(a.data.debe),bold: true,alignment:'right'},
            {text: this.moneyTrans(a.data.haber),bold: true,alignment:'right'},
            {text: this.moneyTrans(a.data.saldoActual),bold: true,alignment:'right'}
          );
        } 
        

        //insertando nivel 1
        objtable1.table.body.push(rowFirst1);
      }else{

        a.children.forEach(b => {
          var objtable3 = {
            table:
            {
              widths:  [60, 180, 85, 85, 85, 85],
              body:[]
            }, layout: layout, colSpan: 3
          }
          
          // Creando rows para la tabla 
          var rowSecond1 = [];
          var rowSecond2 = [];
          var rowSecond3 = [];
         
          if(din.Nivel == 2){
            //! 2 NIVELES
            //insertando Informacion nivel 2
            rowSecond1.push(
              {text:b.data.code},
              {text:b.data.desc, margin:[10,0,0,0]},
              {text: this.moneyTrans(b.data.saldoInicial),alignment:'right'},
              {text: this.moneyTrans(b.data.debe),alignment:'right'},
              {text: this.moneyTrans(b.data.haber),alignment:'right'},
              {text: this.moneyTrans(b.data.saldoActual),alignment:'right'}
            );
            
            //insertando nivel 2
            objtable2.table.body.push(rowSecond1);

     
          }else
          {
           
            b.children.forEach(c => {
              var objtable4 = {
                table:
                {
                  widths: [60, 180, 85, 85, 85, 85],
                  body:[]
                }, layout: layout, colSpan: 3
              }
    
              // Creando rows para la tabla 
              var rowThird1 = [];
              var rowThird2 = [];
              var rowThird3 = [];

              if(din.Nivel == 3){
                //! 3 NIVELES 
                  //insertando Informacion nivel 3
                  rowThird1.push(
                    {text:c.data.code},
                    {text:c.data.desc, margin:[20,0,0,0]},
                    {text: this.moneyTrans(c.data.saldoInicial),alignment:'right'},
                    {text: this.moneyTrans(c.data.debe),alignment:'right'},
                    {text: this.moneyTrans(c.data.haber),alignment:'right'},
                    {text: this.moneyTrans(c.data.saldoActual),alignment:'right'}  
                  );
        
                  //insertando nivel 3
                  objtable3.table.body.push(rowThird1);

                }else{
                c.children.forEach(d => {
                  // Creando rows para la tabla 
                  var rowFourth1 = [];
                  //insertando Informacion nivel 4
                  rowFourth1.push(
                    {text:d.data.code},
                    {text:d.data.desc, margin:[30,0,0,0]},
                    {text: this.moneyTrans(d.data.saldoInicial),alignment:'right'},
                    {text: this.moneyTrans(d.data.debe),alignment:'right'},
                    {text: this.moneyTrans(d.data.haber),alignment:'right'},
                    {text: this.moneyTrans(d.data.saldoActual),alignment:'right'}
                  );
      
                  //insertando nivel 3
                  (c.children.length != 0 || c.children != [])?objtable4.table.body.push(rowFourth1): objtable4.table.body.push({},{},{});
                  
                });
              
            
                //insertando Informacion nivel 3
                rowThird1.push({text:c.data.code,bold: true},{text:c.data.desc,bold: true, margin:[20,0,0,0]},{},{},{},{});
                rowThird2.push(objtable4,{},{},{},{},{});  
                rowThird3.push(
                  {},
                  {text:'TOTAL DE '+c.data.desc+' :',bold: true,alignment:'right' },
                  {text: this.moneyTrans(c.data.saldoInicial),bold: true,alignment:'right'},
                  {text: this.moneyTrans(c.data.debe),bold: true,alignment:'right'},
                  {text: this.moneyTrans(c.data.haber),bold: true,alignment:'right'},
                  {text: this.moneyTrans(c.data.saldoActual),bold: true,alignment:'right'}
                );
      
                //insertando nivel 3
                objtable3.table.body.push(rowThird1);
                objtable3.table.body.push(rowThird2);
                objtable3.table.body.push(rowThird3);
              }
              
            });
            
             //insertando Informacion nivel 2
            rowSecond1.push({text:b.data.code,bold: true},{text:b.data.desc,bold: true, margin:[10,0,0,0]},{},{},{},{});
            rowSecond2.push(objtable3,{},{},{},{},{});
            rowSecond3.push(
              {},
              {text:'TOTAL DE '+b.data.desc+' :',bold: true,alignment:'right' },
              {text: this.moneyTrans(b.data.saldoInicial),bold: true,alignment:'right'},
              {text: this.moneyTrans(b.data.debe),bold: true,alignment:'right'},
              {text: this.moneyTrans(b.data.haber),bold: true,alignment:'right'},
              {text: this.moneyTrans(b.data.saldoActual),bold: true,alignment:'right'}
            );

            //insertando nivel 2
            objtable2.table.body.push(rowSecond1);
            objtable2.table.body.push(rowSecond2);
            objtable2.table.body.push(rowSecond3);

          }
          
        });
        
        //insertando Informacion nivel 1
        rowFirst1.push({text:a.data.code,bold: true},{text:a.data.desc,bold: true},{},{},{},{});
        rowFirst2.push(objtable2,{},{},{},{},{});
        rowFirst3.push(
          {},
          {text:'TOTAL DE '+a.data.desc+' :',bold: true,alignment:'right' },
          {text: this.moneyTrans(a.data.saldoInicial),bold: true,alignment:'right'},
          {text: this.moneyTrans(a.data.debe),bold: true,alignment:'right'},
          {text: this.moneyTrans(a.data.haber),bold: true,alignment:'right'},
          {text: this.moneyTrans(a.data.saldoActual),bold: true,alignment:'right'}
        );
       
        //insertando nivel 1
        objtable1.table.body.push(rowFirst1);
        objtable1.table.body.push(rowFirst2);
        objtable1.table.body.push(rowFirst3);


    }

      body.push(objtable1);
    });

    total.push(
      {},
      {text:'TOTAL DE BALANCE DE COMPROBACIÓN:',bold: true,alignment:'right' },
      {text: this.moneyTrans(this.getAcum(dat,'saldoInicial')),bold: true,alignment:'right'},
      {text: this.moneyTrans(this.getAcum(dat,'debe')),bold: true,alignment:'right'},
      {text: this.moneyTrans(this.getAcum(dat,'haber')),bold: true,alignment:'right'},
      {text: this.moneyTrans(this.getAcum(dat,'saldoActual')),bold: true,alignment:'right'}
    );
    totalBalance.push(
      {text:'ACTIVO:',bold: true },
      {text: this.moneyTrans(this.getMonto(dat,'ACTIVOS')),alignment:'right'},
      {text:'PASIVO + CAPITAL:',bold: true,alignment:'right'},
      {text: this.moneyTrans(this.getMonto(dat,'PASIVOS')),alignment:'right'},
      {text:'INGRESOS - EGRESOS:',bold: true, alignment:'right'},
      {text: this.moneyTrans(this.getIngresoEgreso(dat))},
    );
    objtabletotal.table.body.push(total);

    objtablBalance.table.body.push(vacio);
    objtablBalance.table.body.push(totalBalance);

    body.push(objtabletotal);
    body.push(objtablBalance);
  
      return body;
  }

}
