function(doc) {
  if (doc._id.substr(0,5) === "prep:") {
    emit(doc._id, {
    	"JSONKEY": doc._id.substr(5,7),
    	"secSitBI": doc.secSitBI,
    	"secSitBO": doc.secSitBO,
    	"securityWeaponType": doc.securityWeaponType,
    	"securityManufacturer": doc.securityManufacturer,
    	"securityModel": doc.securityModel,
    	"securityCaliber": doc.securityCaliber,
    	"securityAmmo": doc.securityAmmo,
    	"securityPod": doc.securityPod,
    	"securityScope": doc.securityScope,
    	"securityRedDot": doc.securityRedDot,
    	"securityLaser": doc.securityLaser,
    	"securitySling": doc.securitySling,
    	"securityNotes": doc.securityNotes
    });
  }
};