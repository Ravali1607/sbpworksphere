sap.ui.define([
    "sap/ui/core/mvc/Controller",
], (Controller) => {
    "use strict";
    var that;
    return Controller.extend("sbpworksphere.controller.firstPage", {
        onInit() {
            that = this;
            if(!that.createPlantDialog){
                that.createPlantDialog = sap.ui.xmlfragment("sbpworksphere.fragments.createPlant", that);
            }
            
            var oModel = that.getOwnerComponent().getModel();
            that.getView().setModel(oModel);
        },
        createPlant: function(){
            that.createPlantDialog.open();
        },
        addPlant: function(){
            let oPlant = {
                PLANT_ID : sap.ui.getCore().byId("p_id").getValue(),
                PLANT_NAME : sap.ui.getCore().byId("p_name").getValue(),
                PLANT_LOC : sap.ui.getCore().byId("p_loc").getValue(),
                PLANT_AVATAR : sap.ui.getCore().byId("p_avatar").getValue(),
                PLANT_CONT : sap.ui.getCore().byId("p_cont").getValue(),
                PLANT_EMAIL : sap.ui.getCore().byId("p_email").getValue(),
                PLANT_HEAD : sap.ui.getCore().byId("p_head").getValue(),
                PLANT_REVENUE : sap.ui.getCore().byId("p_rev").getValue(),
                PLANT_CUST_COUNT : sap.ui.getCore().byId("p_count").getValue(),
            }
            var oModel = that.getOwnerComponent().getModel();
            oModel.create("/PLANTS",oPlant,{
                success: function(response){
                    sap.m.MessageToast.show("Plant added to the list");
                },error:function(error){
                    console.log(error);
                    sap.m.MessageToast.show("Error while adding the Plant");
                }
            })
        }
    });
});