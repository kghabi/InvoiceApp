class PdfDataModel {
  items = []; // array of new PdfDataModelItems  => from react js app
  organisation; // organization from db => name , adress , email , phone , fax , matricule Fiscal (Mf),logo , commission , tva (%), droit de timbre
  client; // from react js app =>
  note =""
}
class PdfDataModelItem {
  description = '';
  quantity = 1;
  unitPrice = 0.0;
  totalPrice = 0.0;
}
module.exports = {
  PdfDataModel,
  PdfDataModelItem,
};
