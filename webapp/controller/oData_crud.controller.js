sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller,MessageToast) => {
    "use strict";
    var that;
    return Controller.extend("sbpworksphere.controller.oData_crud", {
        onInit() {
            that = this;
            var oModel = that.getOwnerComponent().getModel();
            that.getView().setModel(oModel);
             
             if(!that.dialogCreate){
                that.dialogCreate = sap.ui.xmlfragment("sbpworksphere.fragments.create", that);
             }
            that.onRead();
        },
        createEmp: function(){
            that.dialogCreate.open();
        },
        onSubmit: function(){
            var eid = sap.ui.getCore().byId("e_id").getValue();
            var ename = sap.ui.getCore().byId("e_name").getValue();
            var eblood = sap.ui.getCore().byId("e_bloodgrp").getValue();
            var edes = sap.ui.getCore().byId("e_des").getValue();
            var eemail = sap.ui.getCore().byId("e_email").getValue();
            var econtact = sap.ui.getCore().byId("e_contact").getValue();
            var eaddress = sap.ui.getCore().byId("e_address").getValue();
            var ebranch = sap.ui.getCore().byId("e_branch").getValue();
            if(eid && ename && eblood && edes && eemail && econtact && eaddress && ebranch){
                var oNewEmployee = {
                    EMP_ID : eid,
                    EMP_NAME : ename,
                    EMP_BLODD_GRP: eblood,
                    EMP_DESIG : edes,
                    EMP_EMAIL : eemail,
                    EMP_CONT : econtact,
                    EMP_ADDRESS : eaddress,
                    EMP_BRANCH : ebranch
                }
            }
            var oData = that.getOwnerComponent().getModel();
        oData.create("/EMPLOYEE", oNewEmployee, {
                success: function (response) {
                    MessageToast.show("Employee Data added successfully");
                    
                },
                error: function (error) {
                    console.log(error)
                }
        })
        that.dialogCreate.close();
        },
        onReset:function(){
            sap.ui.getCore().byId("e_id").setValue("");
            sap.ui.getCore().byId("e_name").setValue("");
            sap.ui.getCore().byId("e_bloodgrp").setValue("");
            sap.ui.getCore().byId("e_des").setValue("");
            sap.ui.getCore().byId("e_email").setValue("");
            sap.ui.getCore().byId("e_contact").setValue("");
            sap.ui.getCore().byId("e_address").setValue("");
            sap.ui.getCore().byId("e_branch").setValue("");
        },
        onClose:function(){
            that.dialogCreate.close();
        },
        onRead: function(){
             var oData = that.getOwnerComponent().getModel();
             oData.read("/EMPLOYEE",{
                 success: function (response) {
                    that.getOwnerComponent().getModel();
                    sap.m.MessageToast.show("Employee Data read successfully");
                 },
                 error: function (error) {
                     console.log(error)
                 }
             })
         },
        onDelete:function(oEvent)
        {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext();
            var oModel = that.getOwnerComponent().getModel();
            var sPath = oContext.getPath();
            oModel.remove(sPath,{
                 success:function()
                 {
                     sap.m.MessageToast.show("Employee Deleted");
            
                 },
                 error:function(error)
                 {
                     console.log(error)
                     sap.m.MessageToast.show("Error");
                 }
            })
        },
    });
});