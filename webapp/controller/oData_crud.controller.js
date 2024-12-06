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
        that.onReset();
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
        onDelete:function(oEvent){
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
        onUpdate: function(oEvent){
            if(!that.dialogUpdate){
                that.dialogUpdate = sap.ui.xmlfragment("sbpworksphere.fragments.update", that);
            }
            
            var oData = oEvent.getSource().getBindingContext().getObject();
            sap.ui.getCore().byId("updateId").setValue(oData.EMP_ID);
            sap.ui.getCore().byId("updateName").setValue(oData.EMP_NAME);
            sap.ui.getCore().byId("updateBloodgrp").setValue(oData.EMP_BLODD_GRP);
            sap.ui.getCore().byId("updateDes").setValue(oData.EMP_DESIG);
            sap.ui.getCore().byId("updateEmail").setValue(oData.EMP_EMAIL);
            sap.ui.getCore().byId("updateContact").setValue(oData.EMP_CONT);
            sap.ui.getCore().byId("updateAddress").setValue(oData.EMP_ADDRESS);
            sap.ui.getCore().byId("updateBranch").setValue(oData.EMP_BRANCH);

            that.dialogUpdate.open();
        },
        updateInfo : function(oEvent){
            
            var eid =sap.ui.getCore().byId("updateId").getValue();
            var eName = sap.ui.getCore().byId("updateName").getValue();
            var eBloodgroup = sap.ui.getCore().byId("updateBloodgrp").getValue();
            var eDes = sap.ui.getCore().byId("updateDes").getValue();
            var eEmail = sap.ui.getCore().byId("updateEmail").getValue();
            var eContact = sap.ui.getCore().byId("updateContact").getValue();
            var eAddress = sap.ui.getCore().byId("updateAddress").getValue();
            var eBranch = sap.ui.getCore().byId("updateBranch").getValue();
            if(eid && eName && eBloodgroup && eDes && eEmail && eContact && eAddress && eBranch){
                var updateEmp ={
                    EMP_ID : eid,
                    EMP_NAME : eName,
                    EMP_BLODD_GRP : eBloodgroup,
                    EMP_DESIG : eDes,
                    EMP_EMAIL : eEmail,
                    EMP_CONT : eContact,
                    EMP_ADDRESS : eAddress,
                    EMP_BRANCH : eBranch
                }
            var oData = that.getOwnerComponent().getModel();
            //var updatePath = "/EMPLOYEE(" + eid + ")";
            var updatePath = `/EMPLOYEE('${eid}')`
            oData.update(updatePath, updateEmp,{
            success: function (response) {
                console.log(response);
                MessageToast.show("Employee Data updated");
            },
            error: function (error) {
                console.log(error)
                MessageToast.show("Error while updating the data");
            }
        })
        that.dialogUpdate.close();
    }else{
        MessageToast.show("Please fill all the fields");
    }
        },
        onCancel: function(){
            that.dialogUpdate.close();
        }
    });
});