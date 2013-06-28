// Devin "Lauren" Elder
// ASD Term 1306
// ASD Application
// 06/27/2013

$.mobile.page.prototype.options.domCache = false;
$('#homePage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});

	$('#displayBugIn').click(function() {
		$("#results").empty();
		getPreps("Yes", "", "", "", "");
		$("#resultsHeader").html("Displaying Bug In Preps...");
	});
	$('#displayBugOut').click(function() {
		$("#results").empty();
		getPreps("", "Yes", "", "", "");
		$("#resultsHeader").html("Displaying Bug Out Preps...");
	});
});

$('#securityPage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#securitySubmit').click(function() {
		storeData();
	});
	$(".input").focus(function() {
		$(this).css("color", "#000000");
	});
});

$('#Setup').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#clearLoc1').click(function() {
		clearStorage();
	});
	$(document).on("click", ".listDetails", function() {
		var gotKey = $(this).data("key");
		getPreps("", "", gotKey, "", "");
	});
});

$('#prepdetails').on('pageinit', function() {

	$('#SecurityPage').click(function() {
		resetFields();
	});
	$(document).on("click", ".edit", function() {
		var eButton = $(this).data("key");
		getPreps("", "", "", eButton, "");
	});
	$(document).on("click", ".delete", function() {
		var dButton = $(this).data("key");
		getPreps("", "", "", "", dButton);
	});
});

$('#aboutPage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
});

// Map Reduce Function
var getPreps = function(BIhomeButton, BOhomeButton, prepDetailPage, editFields, deleteDoc) {
	$.couch.db("asdproject").view("asdproject/preps", {
		success: function(data) {
			$.each(data.rows, function(index, value) {
				var couchItem = (value.value || value.doc);
				if (BIhomeButton   == couchItem.secSitBI[1] ||
					BOhomeButton   == couchItem.secSitBO[1]) {
					displayData(couchItem);
				}
				if (prepDetailPage == couchItem.JSONKEY) {
					displayDetailData(couchItem);
				}
				if (editFields	   == couchItem.JSONKEY) {
					editItem(couchItem);
				}
				if (deleteDoc == couchItem.JSONKEY) {
					deleteItem(couchItem);
				}
			});
		}
	});
};

// Clear Fields Function
var resetFields = function() {
	$(".input").css("color", "#CFCFCF");
	$('#securityForm')[0].reset();
};

// Clear Local Storage Function
var clearLocal = function() {
	window.localStorage.clear();
	alert("All preps deleted.");
	return false;
};
var clearStorage = function() {
	if (window.localStorage.length === 0) {
		alert("There is no data to clear.");
	} else {
		var ask = confirm("Delete all preps?");
		if (ask) {
			clearLocal()
		} else {
			alert("Preps not deleted.");
		}
	}
};

// Store Data Function
var storeData = function(storekey, revision) {
	if (!storekey) {
		var id				= "prep:" + Math.floor(Math.random() * 10001) + "";
	} else {
		var id = "prep:" + storekey + "";
	}
	$(":input:checkbox:checked").val("Yes");
	var	doc						= {};
	doc._id 					= id;
	doc._rev 					= revision
	var newJsonKey 				= id.slice(5);
	doc.JSONKEY 				= newJsonKey;
	doc.secSitBI				= ["Bug In Weapon: ", $("#secSitBI").val()];
	doc.secSitBO				= ["Bug Out Weapon: ", $("#secSitBO").val()];
	doc.securityWeaponType		= ["Weapon Type: ", $("#securityWeaponType").val()];
	doc.securityManufacturer	= ["Manufacturer: ", $("#securityManufacturer").val()];
	doc.securityModel			= ["Model: ", $("#securityModel").val()];
	doc.securityCaliber			= ["Caliber: ", $("#securityCaliber").val()];
	doc.securityAmmo			= ["Amount of Ammo: ", $("#securityAmmo").val()];
	doc.securityPod				= ["Has Bipod/Tripod: ", $("#securityPod").val()];
	doc.securityScope			= ["Has Scope: ", $("#securityScope").val()];
	doc.securityRedDot			= ["Has Red-Dot Sight: ", $("#securityRedDot").val()];
	doc.securityLaser			= ["Has Laser: ", $("#securityLaser").val()];
	doc.securitySling			= ["Has Sling: ", $("#securitySling").val()];
	doc.securityNotes			= ["Notes: ", $("#securityNotes").val()];
	console.log(id);
	$.couch.db("asdproject").saveDoc(doc, {
		success: function(data) {
			alert("Prep Saved!");
		}
	});
};

// Edit Item Function
var editItem = function(eButtonValue) {
	resetFields();
	$(".input").css("color", "#000000");
	$("#securityWeaponType").val(eButtonValue.securityWeaponType[1]);
	$("#securityManufacturer").val(eButtonValue.securityManufacturer[1]);
	$("#securityModel").val(eButtonValue.securityModel[1]);
	$("#securityCaliber").val(eButtonValue.securityCaliber[1]);
	$("#securityAmmo").val(eButtonValue.securityAmmo[1]);
	if (eButtonValue.secSitBI[1] == "Yes") {
		$("#secSitBI").prop("checked", true);
	};
	if (eButtonValue.secSitBO[1] == "Yes") {
		$("#secSitBO").prop("checked", true);
	};
	if (eButtonValue.securityPod[1] == "Yes") {
		$("#securityPod").prop("checked", true);
	};
	if (eButtonValue.securityScope[1] == "Yes") {
		$("#securityScope").prop("checked", true);
	};
	if (eButtonValue.securityRedDot[1] == "Yes") {
		$("#securityRedDot").prop("checked", true);
	};
	if (eButtonValue.securityLaser[1] == "Yes") {
		$("#securityLaser").prop("checked", true);
	};
	if (eButtonValue.securitySling[1] == "Yes") {
		$("#securitySling").prop("checked", true);
	};
	$("#securityNotes").val(eButtonValue.securityNotes[1]);
	$("#securitySubmit").click(function() {
		console.log(eButtonValue.JSONKEY);
		storeData(eButtonValue.JSONKEY, eButtonValue.revised);
	});
};

// Display Data Function
var displayData = function(listviewData) {
	var newListViewData = listviewData;
	$(".results").append(
		$("<li>").append(
			$('<a href="#prepdetails" class="listDetails" data-key="' + newListViewData.JSONKEY + '" >' + newListViewData.securityManufacturer[1] + ' - ' + newListViewData.securityModel[1] + '</a>')
		)
	);
	$(".results").listview("refresh");
};

// Display Details Function
var displayDetailData = function(detailData) {
	var myNewDetailedData = detailData;
	$("#showDetails").empty();
	$("#showDetails")
		.append("<li>" + myNewDetailedData.secSitBI[0] + myNewDetailedData.secSitBI[1] + "</li>")
		.append("<li>" + myNewDetailedData.secSitBO[0] + myNewDetailedData.secSitBO[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityWeaponType[0] + myNewDetailedData.securityWeaponType[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityManufacturer[0] + myNewDetailedData.securityManufacturer[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityModel[0] + myNewDetailedData.securityModel[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityCaliber[0] + myNewDetailedData.securityCaliber[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityAmmo[0] + myNewDetailedData.securityAmmo[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityPod[0] + myNewDetailedData.securityPod[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityScope[0] + myNewDetailedData.securityScope[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityRedDot[0] + myNewDetailedData.securityRedDot[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityLaser[0] + myNewDetailedData.securityLaser[1] + "</li>")
		.append("<li>" + myNewDetailedData.securitySling[0] + myNewDetailedData.securitySling[1] + "</li>")
		.append("<li>" + myNewDetailedData.securityNotes[0] + myNewDetailedData.securityNotes[1] + "</li>")
		.append('<li><a href="#securityPage" class="edit" style="color:#009ACD; text-align:center;" data-role="button" data-key="' + myNewDetailedData.JSONKEY + '" >Edit Prep</a></li>')
		.append('<li><a href="#homePage" class="delete" style="color:#E3170D; text-align:center;" data-role="button" data-key="' + myNewDetailedData.JSONKEY + '" >Delete Prep</a></li>')
	$("#showDetails").listview("refresh");
};

// Delete Item Function
var deleteItem = function(dButtonValue) {
	var deleteMe   = dButtonValue.JSONKEY;
	var deleteMeId = "prep:" + deleteMe + "";
	var deleteDoc  = {};
	deleteDoc._id  = deleteMeId;
	deleteDoc._rev = dButtonValue.revised;
	var ask		   = confirm("Delete Prep?");
	if (ask) {
		$.couch.db("asdproject").removeDoc(deleteDoc, {
			success: function(data) {
				alert("Prep Deleted");
			}
		});
	} else {
		alert("Prep Not Deleted")
	}
};






