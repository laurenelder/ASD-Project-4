// Devin "Lauren" Elder
// ASD Term 1306
// ASD Application
// 06/20/2013

$('#homePage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});

	$('#displayBugIn').click(function() {
		getPreps("Yes", "", "", "", "");
		$("#resultsHeader").html("Displaying Bug In Preps...");
	});
	$('#displayBugOut').click(function() {
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
	$('.listDetails').click(function() {
		alert("Bitch I'm Working!!!");
		var gotKey = $(this).data("key");
		getPreps("", "", gotKey, "", "");
	});
});

$('#prepdetails').on('pageinit', function() {

	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('.edit').click(function() {
		var eButton = $(this).data("key");
		getPreps("", "", "", eButton, "");
	});
	$('.delete').click(function() {
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
	console.log(prepDetailPage);
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
					console.log(couchItem.JSONKEY);
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

// Get Key From Url Function
var getUrlKey = function(url) {
	console.log(url);
	var urlData = $(url).attr("href");
	var detailKey = urlData.slice(29);
	var strDetailKey = detailKey.stringify();
	console.log(strDetailKey)
	getPreps("", "", strDetailKey);
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
var storeData = function(storekey) {
	if (!storekey) {
		var id				= "prep:" + Math.floor(Math.random() * 10001) + "";
	} else {
		var id = "prep:" + storekey + "";
	}
	$(":input:checkbox:checked").val("Yes");
	var	doc						= {};
	doc._id 					= id;
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
	console.log(doc);
//	$.couch.db("asdproject").saveDoc(doc, {
//		success: alert("Prep Saved!")
//	}); 
	alert("Prep Saved!");
};



// Edit Item Function
var editItem = function(eButtonValue) {
	var newValue = eButtonValue;
	$("#securityWeaponType").val(newValue.securityWeaponType[1]);
	$("#securityManufacturer").val(newValue.securityManufacturer[1]);
	$("#securityModel").val(newValue.securityModel[1]);
	$("#securityCaliber").val(newValue.securityCaliber[1]);
	$("#securityAmmo").val(newValue.securityAmmo[1]);
	if (newValue.secSitBI[1] == "Yes") {
		$("#secSitBI").prop("checked", true);
	};
	if (newValue.secSitBO[1] == "Yes") {
		$("#secSitBO").prop("checked", true);
	};
	if (newValue.securityPod[1] == "Yes") {
		$("#securityPod").prop("checked", true);
	};
	if (enewValueItem.securityScope[1] == "Yes") {
		$("#securityScope").prop("checked", true);
	};
	if (newValue.securityRedDot[1] == "Yes") {
		$("#securityRedDot").prop("checked", true);
	};
	if (newValue.securityLaser[1] == "Yes") {
		$("#securityLaser").prop("checked", true);
	};
	if (newValue.securitySling[1] == "Yes") {
		$("#securitySling").prop("checked", true);
	};
	$("#securityNotes").val(newValue.securityNotes[1]);
	$("#securitySubmit").click(function() {
		storeData(newValue.JSONKEY);
	});
};

// Display Data Function
var displayData = function(listviewData) {
	var newListViewData = listviewData;
	$(".results").append(
		$("<li>").append(
			$('<a href="#prepdetails" class="listDetails" data-key"' + newListViewData.JSONKEY + '">' + newListViewData.securityManufacturer[1] + ' - ' + newListViewData.securityModel[1] + '</a>')
		)
	);
	$(".results").listview("refresh");
};

// Display Details Function
var displayDetailData = function(detailData) {
	var myNewDetailedData = detailData;
	console.log(detailData);
	$("#showDetails")
		.append("<li>" + myNewDetailedData.secSitBI[0] + myNewDetailedData.secSitBI[1] + "</li>")
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
		.append('<a class="edit" data-role="button" data-key="' + myNewDetailedData.JSONKEY + '">Edit Prep</a>')
		.append('<a class="delete" data-role="button" data-key="' + myNewDetailedData.JSONKEY + '">Delete Prep</a>')
	$("#showDetails").listview("refresh");
};

// Delete Item Function
var deleteItem = function(dButtonValue) {
	var ask = confirm("Delete Prep?");
	if (ask) {
		window.localStorage.removeItem(dButton);
		alert("Prep Deleted");
	} else {
		alert("Prep Not Deleted")
	}
};






