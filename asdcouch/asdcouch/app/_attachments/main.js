// Devin "Lauren" Elder
// ASD Term 1306
// ASD Application
// 06/20/2013

$('#homePage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});

	$('#displayBugIn').click(function() {
		getPreps("Yes", "", "", "");
		$("#resultsHeader").html("Displaying Bug In Preps...");
	});
	$('#displayBugOut').click(function() {
		getPreps("", "Yes", "", "");
		$("#resultsHeader").html("Displaying Bug Out Preps...");
	});
});

$('#securityPage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#securitySubmit').click(function() {
		$(".securityForm").validate({
			rules: {
				securityManufacturer: "required",
				securityModel: "required",
				checkbox: "required"
			},
			messages: {
				securityManufacturer: "Please Provide the Manufacturer of the Weapon.",
				securityModel: "Please Provide the Model of the Weapon.",
				checkbox: "Please Indicate the Situation of use for the Weapon."
			},
			submitHandler: function(form) {
				form.submit(function() {
					storedata()
				});
			}
		});
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
	$('.edit').click(function() {
		var eButton = $(this).data("key");
		editItem(eButton);
	});
	$('.delete').click(function() {
		var dButton = $(this).data("key");
		deleteItem(dButton);
	});
	$('.listDetails').click(function() {
		console.log(this);
		var urlData = $(this).attr("href");
		var detailKey = urlData.slice(29);
		var strDetailKey = detailKey.stringify();
		console.log(detailKey);
		console.log(strDetailKey)
		getPreps("", "", strDetailKey, "");
		//getUrlKey(this);
	});
});

$('#aboutPage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#addJSON').click(function() {
		/*
		$.ajax({
			url		: '_view/preps',
			type 	: 'GET',
			dataType: 'json',
			success : function(data, textStatus) {
				$.each(data.rows, function(index, preps) {
					//console.log(preps.value);
					var JSONkey = preps.value.JSONKEY;
					var	JSONitem					= {};
					JSONitem.secSitBI				= [preps.value.secSitBI[0], preps.value.secSitBI[1]];
					JSONitem.secSitBO				= [preps.value.secSitBO[0], preps.value.secSitBO[1]];
					JSONitem.securityWeaponType		= [preps.value.securityWeaponType[0], preps.value.securityWeaponType[1]];
					JSONitem.securityManufacturer	= [preps.value.securityManufacturer[0], preps.value.securityManufacturer[1]];
					JSONitem.securityModel			= [preps.value.securityModel[0], preps.value.securityModel[1]];
					JSONitem.securityCaliber		= [preps.value.securityCaliber[0], preps.value.securityCaliber[1]];
					JSONitem.securityAmmo			= [preps.value.securityAmmo[0], preps.value.securityAmmo[1]];
					JSONitem.securityPod			= [preps.value.securityPod[0], preps.value.securityPod[1]];
					JSONitem.securityScope			= [preps.value.securityScope[0], preps.value.securityScope[1]];
					JSONitem.securityRedDot			= [preps.value.securityRedDot[0], preps.value.securityRedDot[1]];
					JSONitem.securityLaser			= [preps.value.securityLaser[0], preps.value.securityLaser[1]];
					JSONitem.securitySling			= [preps.value.securitySling[0], preps.value.securitySling[1]];
					JSONitem.securityNotes			= [preps.value.securityNotes[0], preps.value.securityNotes[1]];
					window.localStorage.setItem(JSONkey, JSON.stringify(JSONitem));
				});
				alert("JSON Loaded");
			}
		});
		return false;
		*/
		$.couch.db("asdproject").view("asdproject/preps", {
			success: function(data) {
				console.log(data);
				$.each(data.rows, function(index, value) {
					var couchItem = (value.value || value.doc);
					$(".results").append(
						$("<li>").append(
							$('<a class="listDetails">')
								.attr("href", "prepdetails.html?prepdetails=" + couchItem.JSONKEY)
								.text(couchItem.securityManufacturer[1] + ' - ' + couchItem.securityModel[1])
						)
					);
				});
				$(".results").listview("refresh");
			}
		});
	});
});

// Map Reduce Function
var getPreps = function(BIhomeButton, BOhomeButton, prepDetailPage, editFields, deleteDoc) {
	console.log(prepDetailPage);
	$.couch.db("asdproject").view("asdproject/preps", {
		success: function(data) {
			$.each(data.rows, function(index, value) {
				console.log(index);
				console.log(value);
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
var storeData = function(form, key) {
	console.log(form);
	if (!key) {
		var id				= Math.floor(Math.random() * 1000001);
	} else {
		var id = key;
	}
	$(":input:checkbox:checked").val("Yes");
	var	item					= {};
	item.secSitBI				= ["Bug In Weapon: ", $("#secSitBI").val()];
	item.secSitBO				= ["Bug Out Weapon: ", $("#secSitBO").val()];
	item.securityWeaponType		= ["Weapon Type: ", $("#securityWeaponType").val()];
	item.securityManufacturer	= ["Manufacturer: ", $("#securityManufacturer").val()];
	item.securityModel			= ["Model: ", $("#securityModel").val()];
	item.securityCaliber		= ["Caliber: ", $("#securityCaliber").val()];
	item.securityAmmo			= ["Amount of Ammo: ", $("#securityAmmo").val()];
	item.securityPod			= ["Has Bipod/Tripod: ", $("#securityPod").val()];
	item.securityScope			= ["Has Scope: ", $("#securityScope").val()];
	item.securityRedDot			= ["Has Red-Dot Sight: ", $("#securityRedDot").val()];
	item.securityLaser			= ["Has Laser: ", $("#securityLaser").val()];
	item.securitySling			= ["Has Sling: ", $("#securitySling").val()];
	item.securityNotes			= ["Notes: ", $("#securityNotes").val()];
	window.localStorage.setItem(id, JSON.stringify(item));
	alert("Prep Saved!")
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
	$(".results").append(
		$("<li></li>").append(
			$('<a href="prepdetails.html?prepdetails="' + listviewData.JSONKEY + ' class="listDetails">' + listviewData.securityManufacturer[1] + ' - ' + listviewData.securityModel[1] + '</a>')
			)
		);
	$(".results").listview("refresh");
};

// Display Details Function
var displayDetailData = function(detailData) {
	console.log(detailData);
	$("#showDetails")
		.append("<li>" + detailData.secSitBI[0] + detailData.secSitBI[1] + "</li>")
		.append("<li>" + detailData.securityWeaponType[0] + detailData.securityWeaponType[1] + "</li>")
		.append("<li>" + detailData.securityManufacturer[0] + detailData.securityManufacturer[1] + "</li>")
		.append("<li>" + detailData.securityModel[0] + detailData.securityModel[1] + "</li>")
		.append("<li>" + detailData.securityCaliber[0] + detailData.securityCaliber[1] + "</li>")
		.append("<li>" + detailData.securityAmmo[0] + detailData.securityAmmo[1] + "</li>")
		.append("<li>" + detailData.securityPod[0] + detailData.securityPod[1] + "</li>")
		.append("<li>" + detailData.securityScope[0] + detailData.securityScope[1] + "</li>")
		.append("<li>" + detailData.securityRedDot[0] + detailData.securityRedDot[1] + "</li>")
		.append("<li>" + detailData.securityLaser[0] + detailData.securityLaser[1] + "</li>")
		.append("<li>" + detailData.securitySling[0] + detailData.securitySling[1] + "</li>")
		.append("<li>" + detailData.securityNotes[0] + detailData.securityNotes[1] + "</li>")
		.append("<li>" + detailData.secSitBI[0] + detailData.secSitBI[1] + "</li>")
		.append("<li>" + detailData.secSitBI[0] + detailData.secSitBI[1] + "</li>")
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






