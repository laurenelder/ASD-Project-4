// Devin "Lauren" Elder
// ASD Term 1306
// ASD Application
// 06/20/2013

$('#homePage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});

	$('#displayBugIn').click(function() {
		displayData("Bug In");
		$("#resultsHeader").html("Displaying Bug In Preps...");
	});
	$('#displayBugOut').click(function() {
		displayData("Bug Out");
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
});

$('#aboutPage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#addJSON').click(function() {
		$.ajax({
			url		: '_view/preps',
			type 	: 'GET',
			dataType: 'json',
			success : function(data, textStatus) {
				$.each(data.rows, function(index, preps) {
					console.log(preps.value);
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
	});
});

// Clear Fields Function
var resetFields = function() {
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
var storeData = function(key) {
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
var editItem = function(eButton) {
	console.log(eButton);
	var newKey = eButton;
	var editValue = window.localStorage.getItem(newKey);
	var eItem = JSON.parse(editValue);
	$("#securityWeaponType").val(eItem.securityWeaponType[1]);
	$("#securityManufacturer").val(eItem.securityManufacturer[1]);
	$("#securityModel").val(eItem.securityModel[1]);
	$("#securityCaliber").val(eItem.securityCaliber[1]);
	$("#securityAmmo").val(eItem.securityAmmo[1]);
	if (eItem.secSitBI[1] == "Yes") {
		$("#secSitBI").prop("checked", true);
	};
	if (eItem.secSitBO[1] == "Yes") {
		$("#secSitBO").prop("checked", true);
	};
	if (eItem.securityPod[1] == "Yes") {
		$("#securityPod").prop("checked", true);
	};
	if (eItem.securityScope[1] == "Yes") {
		$("#securityScope").prop("checked", true);
	};
	if (eItem.securityRedDot[1] == "Yes") {
		$("#securityRedDot").prop("checked", true);
	};
	if (eItem.securityLaser[1] == "Yes") {
		$("#securityLaser").prop("checked", true);
	};
	if (eItem.securitySling[1] == "Yes") {
		$("#securitySling").prop("checked", true);
	};
	$("#securityNotes").val(eItem.securityNotes[1]);
	$("#securitySubmit").click(function() {
		storeData(newKey);
		console.log(newKey);
	});
};

// Display Data Function
var displayData = function(cat) {
	if (window.localStorage.length === 0) {
		alert("There are no preps to display.");
	}
	$(".results").empty();
	for (var i = 0, j = window.localStorage.length; i < j; i++) {
		//$(".results").append("<br/>");
		var key = window.localStorage.key(i);
		var value = window.localStorage.getItem(key);
		var obj = JSON.parse(value);
		var liID = 1111 + (i);
		var ulID = key;
		$(".results").append('<li id="' + liID + '">' + obj.securityManufacturer[1] + ' - ' + obj.securityModel[1] + '</li>');
		$("#" + liID + "").append("<ul id=" + ulID + "></ul>");
		if (obj.secSitBI[1] == "Yes" && cat == "Bug In" || obj.secSitBO[1] == "Yes" && cat == "Bug Out" || obj.secSitBI[1] == "Yes" && obj.secSitBO[1] == "Yes") {
			var content = "";
			for (var n in obj) {
				content += "<li>";
				content += obj[n][0] + " " + obj[n][1];
				content += "</li>";
			};
			$("#" + ulID + "").append(content);
			$("#" + ulID + "").append(
				"<li><a href='#securityPage' data-role='button' data-key='" + ulID + "' class='edit'>Edit Prep</a></li>" 
				+ 
				"<li><a href='#homePage' data-role='button' data-key='" + ulID + "' class='delete'>Delete Prep</a></li>"
			);
		}
	};
	$(".results").listview("refresh");
};

// Delete Item Function
var deleteItem = function(dButton) {
	var ask = confirm("Delete Prep?");
	if (ask) {
		window.localStorage.removeItem(dButton);
		alert("Prep Deleted");
	} else {
		alert("Prep Not Deleted")
	}
};






