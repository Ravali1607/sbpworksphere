sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";
    var that;
    return Controller.extend("sbpworksphere.controller.oData_crud", {
        onInit() {
             that = this;
            that.onReadAll();
             
        },

         onReadAll: function(){
            this.getOwnerComponent().getModel().read("/EMPLOYEE",{
                 success: function(oData){
                     var oModel = new sap.ui.model.json.JSONModel(oData);
                     this.byId("employeeTable").setModel(oModel);
                 },
                 error:function(oError){
                     console.log(oError);
                 }
             });
         },
         
    });
});