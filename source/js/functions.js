const version = 1.3;
const url = "http://" + window.location.hostname + "/";
const iconsUrl = "./assets/images/";
const tilesUrl = "./map/{z}_{x}_{y}.jpg";
let maxNativeZoom = 5;
let mapMinZoom = 1;
let mapMaxZoom = 5;
let mapSize = 8192;
let tileSize = 256;
let mapScale = mapSize / tileSize;
let mapOffset = mapSize / mapScale / 2;
let halfTile = tileSize / 2;
let mapBounds = 4096;
L.CRS.MySimple = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1 / 16, 0, -1 / 16, 256),
});
let myBounds = [
    [0, 0],
    [mapBounds, mapBounds],
];
let map = L.map("map", {
    maxNativeZoom: maxNativeZoom,
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    zoomControl: !1,
    fullscreenControl: !0,
    fullscreenControlOptions: {
        position: "topright",
    },
    crs: L.CRS.MySimple,
    scrollWheelZoom: !1,
    smoothWheelZoom: !0,
    smoothSensitivity: 1,
}).setView([2048, 2048], 2);
L.tileLayer
    .canvas(tilesUrl, {
        maxNativeZoom: maxNativeZoom,
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        tileSize: tileSize,
        noWrap: !0,
        tms: !1,
        bounds: myBounds,
        continuousWorld: !0,
    })
    .addTo(map),
    map.setMaxBounds([
        [-3e3, -3e3],
        [7e3, 7e3],
    ]),
    (window.latLngToPixels = function (e) {
        return window.map.project([e.lat, e.lng], window.map.getMaxZoom());
    }),
    (window.pixelsToLatLng = function (e, t) {
        return window.map.unproject([e, t], window.map.getMaxZoom());
    });
let popup = L.popup();
new L.Control.Zoom({
    position: "topright",
}).addTo(map);
let sidebar = L.control.sidebar("sidebar").addTo(map);
sidebar.open("home");
let hash = new L.Hash(map);

function gridfix() {
    let e = L.GridLayer.prototype._initTile;
    L.GridLayer.include({
        _initTile: function (t) {
            e.call(this, t);
            let a = this.getTileSize();
            (t.style.width = a.x + 0.5 + "px"),
                (t.style.height = a.y + 0.5 + "px");
        },
    });
}
L.Control.Coordinates.include({
    _update: function (e) {
        let t = e.latlng;
        let a = this.options;
        t &&
            ((this._currentPos = t),
            (this._inputY.value = L.NumberFormatter.round(
                t.lat,
                a.decimals,
                a.decimalSeperator,
            )),
            (this._inputX.value = L.NumberFormatter.round(
                t.lng,
                a.decimals,
                a.decimalSeperator,
            )),
            (this._label.innerHTML = this._createCoordinateLabel(t)));
    },
}),
    L.control
        .coordinates({
            position: "bottomright",
            decimals: 0,
            decimalSeperator: ".",
            labelTemplateLat: "Y: {y}",
            labelTemplateLng: "X: {x}",
            enableUserInput: !0,
            useDMS: !1,
            useLatLngOrder: !1,
            markerType: L.marker,
            markerProps: {},
        })
        .addTo(map);
let layerGroups = [];
let textLayer = [];
let globalMarkers = [];
let transparentMarker = L.icon({
    iconUrl: iconsUrl + "alpha_marker.png",
    iconSize: [1, 1],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
});
for (let e = 0; e < textMarkers.length; e++) {
    null == layerGroups.textmarkers &&
        (layerGroups.textmarkers = new L.LayerGroup());
    let t = new L.marker(textMarkers[e].coords, {
        opacity: 0,
        icon: transparentMarker,
    });
    t.bindTooltip(textMarkers[e].name, {
        permanent: !0,
        direction: "top",
        className: "text-label",
        offset: [0, 0],
    }),
        t.addTo(layerGroups.textmarkers);
}

function getIcon(e) {
    let t = markers[e].icon;
    return L.icon({
        iconUrl: iconsUrl + t + ".png",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
    });
}
map.on("zoomend", function (e) {
    switch (map.getZoom()) {
        case 0:
            $(".text-label").css("visibility", "visible"),
                $(".text-label span").css("font-size", "12px"),
                $(".text-label.secondary").css("visibility", "hidden");
            break;
        case 1:
            $(".text-label").css("visibility", "visible"),
                $(".text-label span").css("font-size", "14px"),
                $(".text-label.secondary").css("visibility", "hidden");
            break;
        case 2:
            $(".text-label").css("visibility", "visible"),
                $(".text-label span").css("font-size", "16px"),
                $(".text-label.secondary").css("visibility", "hidden");
            break;
        case 3:
            $(".text-label").css("visibility", "visible"),
                $(".text-label span").css("font-size", "18px"),
                $(".text-label.secondary").css("visibility", "hidden");
            break;
        case 4:
        case 5:
            $(".text-label").css("visibility", "visible"),
                $(".text-label span").css("font-size", "20px"),
                $(".text-label.secondary").css("visibility", "hidden");
    }
});

for (let e = 0; e < markers.length; e++) {
    null == layerGroups[markers[e].group] &&
        (layerGroups[markers[e].group] = new L.LayerGroup()),
        null == markers[e].desc && (markers[e].desc = ""),
        null == markers[e].items && (markers[e].items = ""),
        null == markers[e].kcditems && (markers[e].kcditems = "");
    let t = "";
    for (let a in markers[e].kcditems) {
        markers[e].kcditems[a];
        t +=
            '<li><i class="' +
            markers[e].kcditems[a].item +
            '"></i><span class="iname" data-i18n="' +
            markers[e].kcditems[a].item +
            '">' +
            markers[e].kcditems[a].item.replace(/_/gi, " ") +
            '</span><span class="qnt">' +
            markers[e].kcditems[a].qnt +
            "</span></li>";
    }
    let a = markers[e].coords[1].toFixed(0);
    let i = markers[e].coords[0].toFixed(0);
    let r = markers[e].coords[1].toFixed(0);
    let o = markers[e].coords[0].toFixed(0);
    let n = url + "?marker=" + i + "," + a;
    n = encodeURI(n);
    let s = L.marker([a, i], {
        icon: getIcon(e),
        title: markers[e].group,
    })
        .bindPopup(
            "<p class='mtitle'>" +
                markers[e].name +
                "</p><span class='mdesc'>" +
                markers[e].desc +
                "</span><ul class='ilist'>" +
                t +
                "</ul><p class='original_coords'>" +
                o +
                "," +
                r +
                "</p><p class='markerlink hide'>" +
                n +
                "</p><button class='copymarkerurl'><span class='sharetext'  data-i18n='copylink'>Copy link</span><span class='copiedmsg hide'>Copied</span></button>",
        )
        .addTo(layerGroups[markers[e].group]);
    globalMarkers.push(s);
}

function getIconUsr(e) {
    let t = usr_markers[e].icon;
    return L.icon({
        iconUrl: iconsUrl + t + ".png",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
    });
}
for (let e = 0; e < usr_markers.length; e++) {
    let t = usr_markers[e];
    null == layerGroups[t.group] && (layerGroups[t.group] = new L.LayerGroup()),
        null == t.desc && (t.desc = ""),
        null == t.desc2 && (t.desc2 = ""),
        null == t.items && (t.items = "");
    let a = "";
    null != t.req &&
        ((t.req = null == t.req ? "" : t.req),
        (t.level = null == t.level ? "" : t.level),
        (a =
            '<p class="req" data-i18n="req">Requirements:</p><ul class="ilist"><li><i class="' +
            t.req +
            '"></i><span class="iname" data-i18n="' +
            t.req +
            '">' +
            t.req.replace(/_/gi, " ") +
            '</span><span class="ilevel ' +
            t.level +
            '" data-i18n="' +
            t.level +
            '">' +
            t.level.replace(/_/gi, " ") +
            "</span></li>"));
    let i = "";
    for (let e in t.items)
        i +=
            '<li><i class="' +
            t.items[e] +
            '"></i><span class="iname" data-i18n="' +
            t.items[e] +
            '">' +
            t.items[e].replace(/_/gi, " ") +
            "</span></li>";
    let r = t.coords[1];
    let o = t.coords[0];
    let n = url + "?marker=" + o + "," + r;
    n = encodeURI(n);
    let s = L.marker([r, o], {
        icon: getIconUsr(e),
        title: t.name,
    })
        .bindPopup(
            "<p class='mtitle'>" +
                t.name +
                "</p><p class='mdesc'>" +
                t.desc +
                "</p><p class='mdesc'>" +
                t.desc2 +
                "</p>" +
                a +
                "<ul class='ilist'>" +
                i +
                "</ul><p class='original_coords'>" +
                o +
                "," +
                r +
                "</p><p class='markerlink hide'>" +
                n +
                "</p><button class='copymarkerurl'><span class='sharetext'  data-i18n='share'>Share</span><span class='copiedmsg hide'>Copied</span></button>",
        )
        .addTo(layerGroups[t.group]);
    globalMarkers.push(s);
}

function toggle(e, t) {
    e.checked
        ? map.addLayer(layerGroups[t])
        : ($("#allmarkers").prop("checked", !1),
          map.removeLayer(layerGroups[t]));
}

let allmarkers = document.getElementById("allmarkers");

function toggleAll(e) {
    if (e.checked) {
        $(".markers-list input").prop("checked", !0);
        for (let e in layerGroups) map.addLayer(layerGroups[e]);
    } else {
        $(".markers-list input").prop("checked", !1);
        for (let e in layerGroups) map.removeLayer(layerGroups[e]);
    }
}

function getUrlVars() {
    let e = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (t, a, i) {
        e[a] = i;
    });
    return e;
}
(allmarkers.onchange = function () {
    toggleAll(this);
}),
    $(allmarkers).click(function () {
        if (1 == $(this).prop("checked")) {
            let e;
            let t = [];
            $(".markers-list input").each(function () {
                (e = {
                    id: $(this).attr("id"),
                    value: $(this).prop("checked"),
                }),
                    t.push(e);
            }),
                localStorage.setItem("activemarkers", JSON.stringify(t));
        } else
            0 == $(this).prop("checked") &&
                localStorage.setItem("activemarkers", "[]");
    }),
    $(".markers-list input").each(function () {
        this.onchange = function () {
            toggle(this, this.id),
                "textmarkers" == this.id &&
                    ($(this.id).is(":checked")
                        ? ($(".text-label").css("visibility", "hidden"),
                          $(".text-label.secondary").css(
                              "visibility",
                              "hidden",
                          ))
                        : ($(".text-label").css("visibility", "visible"),
                          $(".text-label").css("font-size", "24px"),
                          $(".text-label.secondary").css(
                              "visibility",
                              "hidden",
                          )));
        };
    });
let urlCoordinates = getUrlVars().marker;
if (null != urlCoordinates) {
    let e = !1;
    if ((sidebar.close(), getUrlVars().zoom >= 1 && getUrlVars().zoom <= 4)) {
        getUrlVars().zoom;
    } else {
    }
    for (let t in globalMarkers) {
        let a = globalMarkers[t]._latlng.lat;
        globalMarkers[t]._latlng.lng + "," + a == urlCoordinates &&
            ($("#" + globalMarkers[t].options.title).prop("checked", !0),
            map.addLayer(layerGroups[globalMarkers[t].options.title]),
            map.flyTo(globalMarkers[t].getLatLng(), urlZoom),
            "false" != getUrlVars().popup && globalMarkers[t].openPopup(),
            (e = !0));
    }
    if (0 == e) {
        let e = urlCoordinates.split(",")[1];
        let t = urlCoordinates.split(",")[0];
        if (e <= mapBounds && e > 0 && t <= mapBounds && t > 0) {
            let a = L.marker([e, t]);
            map.flyTo(a.getLatLng(), urlZoom), (a = null);
        }
        (e = null), (t = null);
    }
}

function copy(e) {
    let t = $("<input>");
    $("body").append(t),
        t.val($(e).text()).select(),
        document.execCommand("copy"),
        t.remove();
}
$(document).on("click", ".copymarkerurl", function () {
    let e = $(this).parent().find(".markerlink");
    let t = $("<input>");
    $("body").append(t),
        t.val($(e).text()).select(),
        document.execCommand("copy"),
        $(".copiedmsg").fadeIn({
            queue: !1,
            duration: "300",
        }),
        $(".copiedmsg").delay(1e3).fadeOut(300),
        t.remove();
});
let locatedGroup = L.layerGroup();

function numonly(e) {
    $("#mlat,#mlon").keyup(function () {
        let e = $(this)
            .val()
            .replace(/-?\d+[^0-9]+/, "");
        /^\s*$/.test(e),
            (e =
                e > 0
                    ? parseInt(e) > 2934
                        ? 2934
                        : e
                    : parseInt(e) > -2394
                      ? e
                      : -2394),
            $(this).val(e);
    });
}

function getAObj(t, a) {
    for (e in t) {
        if (t[e].name == a) {
            return t[e].value;
        }
    }

    return 0;
}

markers.forEach(function (e) {
    let t = L.marker(e.latLng, {
        title: e.name,
        riseOnHover: !0,
    }).bindPopup(e.name);

    locatedGroup.addLayer(t);

    e.marker_id = locatedGroup.getLayerId(t);
});

markers.forEach(function (e) {
    $(".locate").on("click", function () {
        if ($(this).attr("data-marker") == e.title) {
            let t = L.icon({
                iconUrl: iconsUrl + "alpha_marker.png",
                iconSize: [iWidth, iHeight],
                iconAnchor: [iWidth / 2, iHeight],
                popupAnchor: [0, -iHeight],
            });

            $("#" + e.group).prop("checked", !0);
            map.addLayer(layerGroups[e.group]);

            let a = L.marker(e.coords, {
                icon: t,
            })
                .bindPopup(e.name + "<br>" + e.desc)
                .addTo(map);

            map.panTo(a.getLatLng()),
                a.openPopup(),
                a.on("popupclose", function () {
                    map.removeLayer(a);
                });
        }
    });
});

let mapMarkers = [
    {
        icon: "arrow",
        width: "36",
        height: "36",
    },
    {
        icon: "accident",
        width: "36",
        height: "36",
    },
    {
        icon: "alchemy_bench",
        width: "36",
        height: "36",
    },
    {
        icon: "apothecary",
        width: "36",
        height: "36",
    },
    {
        icon: "archery_range",
        width: "36",
        height: "36",
    },
    {
        icon: "armourer",
        width: "36",
        height: "36",
    },
    {
        icon: "baker",
        width: "36",
        height: "36",
    },
    {
        icon: "bandit_camp",
        width: "36",
        height: "36",
    },
    {
        icon: "baths",
        width: "36",
        height: "36",
    },
    {
        icon: "beehive",
        width: "36",
        height: "36",
    },
    {
        icon: "blacksmith",
        width: "36",
        height: "36",
    },
    {
        icon: "boar_hunting_spot",
        width: "36",
        height: "36",
    },
    {
        icon: "butcher",
        width: "36",
        height: "36",
    },
    {
        icon: "camp",
        width: "36",
        height: "36",
    },
    {
        icon: "cave",
        width: "36",
        height: "36",
    },
    {
        icon: "charcoal_burner",
        width: "36",
        height: "36",
    },
    {
        icon: "cobbler",
        width: "36",
        height: "36",
    },
    {
        icon: "combat_arena",
        width: "36",
        height: "36",
    },
    {
        icon: "conciliation_cross",
        width: "36",
        height: "36",
    },
    {
        icon: "deer_hunting_spot",
        width: "36",
        height: "36",
    },
    {
        icon: "fast_travel",
        width: "64",
        height: "64",
    },
    {
        icon: "fish_trap",
        width: "36",
        height: "36",
    },
    {
        icon: "fishing_spot",
        width: "36",
        height: "36",
    },
    {
        icon: "grave",
        width: "36",
        height: "36",
    },
    {
        icon: "grindstone",
        width: "36",
        height: "36",
    },
    {
        icon: "grocer",
        width: "36",
        height: "36",
    },
    {
        icon: "herbalist",
        width: "36",
        height: "36",
    },
    {
        icon: "home",
        width: "36",
        height: "36",
    },
    {
        icon: "horse_trader",
        width: "36",
        height: "36",
    },
    {
        icon: "huntsman",
        width: "36",
        height: "36",
    },
    {
        icon: "interesting_site",
        width: "36",
        height: "36",
    },
    {
        icon: "lodgings",
        width: "36",
        height: "36",
    },
    {
        icon: "miller",
        width: "36",
        height: "36",
    },
    {
        icon: "nest",
        width: "36",
        height: "36",
    },
    {
        icon: "scribe",
        width: "36",
        height: "36",
    },
    {
        icon: "shrine",
        width: "36",
        height: "36",
    },
    {
        icon: "tailor",
        width: "36",
        height: "36",
    },
    {
        icon: "tanner",
        width: "36",
        height: "36",
    },
    {
        icon: "tavern",
        width: "36",
        height: "36",
    },
    {
        icon: "trader",
        width: "36",
        height: "36",
    },
    {
        icon: "treasure_chest",
        width: "36",
        height: "36",
    },
    {
        icon: "treasure_map",
        width: "36",
        height: "36",
    },
    {
        icon: "treasure_map_alt",
        width: "36",
        height: "36",
    },
    {
        icon: "weaponsmith",
        width: "36",
        height: "36",
    },
    {
        icon: "woodland_garden",
        width: "36",
        height: "36",
    },
    {
        icon: "belladonna",
        width: "36",
        height: "36",
    },
    {
        icon: "chamomile",
        width: "36",
        height: "36",
    },
    {
        icon: "comfrey",
        width: "36",
        height: "36",
    },
    {
        icon: "dandelion",
        width: "36",
        height: "36",
    },
    {
        icon: "eyebright",
        width: "36",
        height: "36",
    },
    {
        icon: "herb_paris",
        width: "36",
        height: "36",
    },
    {
        icon: "marigold",
        width: "36",
        height: "36",
    },
    {
        icon: "mint",
        width: "36",
        height: "36",
    },
    {
        icon: "nettle",
        width: "36",
        height: "36",
    },
    {
        icon: "poppy",
        width: "36",
        height: "36",
    },
    {
        icon: "sage",
        width: "36",
        height: "36",
    },
    {
        icon: "st_johns_wort",
        width: "36",
        height: "36",
    },
    {
        icon: "thistle",
        width: "36",
        height: "36",
    },
    {
        icon: "valerian",
        width: "36",
        height: "36",
    },
    {
        icon: "wormwood",
        width: "36",
        height: "36",
    },
    {
        icon: "marker_a",
        width: "36",
        height: "36",
    },
    {
        icon: "marker_b",
        width: "36",
        height: "36",
    },
    {
        icon: "marker_c",
        width: "36",
        height: "36",
    },
    {
        icon: "star",
        width: "36",
        height: "36",
    },
    {
        icon: "exclamation",
        width: "36",
        height: "36",
    },
];
let markerIconTypes = [];
for (let e in mapMarkers) {
    let t = mapMarkers[e].icon;
    let a = mapMarkers[e].width;
    let i = mapMarkers[e].height;
    markerIconTypes[e] = L.icon({
        className: "",
        iconUrl: iconsUrl + t.replace(/ /g, "") + ".png",
        iconSize: [a, i],
        iconAnchor: [a / 2, i / 2],
        popupAnchor: [0, -i / 2],
    });
}
let groupUser = [];

function initUserLayerGroup() {
    let e = [];
    if (
        ("undefined" == localStorage.mapUserMarkers &&
            (localStorage.mapUserMarkers = "[]"),
        void 0 !== localStorage.mapUserMarkers)
    ) {
        let t = [];
        t = JSON.parse(localStorage.mapUserMarkers);
        for (let a = 0; a < t.length; a++) {
            let i = t[a].coords.x;
            let r = t[a].coords.y;
            let o = t[a].name;
            let n = (t[a].icon, t[a].iconvalue);
            let s = t[a].icon.options.iconUrl;
            let l = t[a].title;
            let c = t[a].desc;
            let d =
                url +
                "?m=" +
                r +
                "," +
                i +
                "&title=" +
                o +
                "&desc=" +
                c +
                "&icon=" +
                n +
                "&";
            d = encodeURI(d);
            let p = L.icon({
                iconUrl: t[a].icon.options.iconUrl,
                iconSize: t[a].icon.options.iconSize,
                iconAnchor: [18, 18],
                popupAnchor: [0, -18],
                className: t[a].icon.options.className,
            });
            let m =
                '<div class="popcontent">\t\t\t<p class="mtitle">' +
                o +
                '</p>\t\t\t<p class="mdesc">' +
                c +
                '</p>\t\t\t<span class="mcoords">X: ' +
                r +
                " Y: " +
                i +
                '</span></div>      <span class="markerlink hide">' +
                d +
                '</span>      <button class="copymarkerurl"><span class="sharetext" data-i18n="copylink">Copy link</span>      <span class="copiedmsg hide">Copied</span></button>\t\t\t<button class="edit-marker" data-i18n="edit_marker">Edit marker</button>\t\t\t<div id="edit-dialog" class="hide">\t\t\t<div class="chooseIcon" data-i18n="choose_icon">Choose Icon:</div>\t\t\t<div id="iconprev" style="background-image:url(\'' +
                s +
                '\')"></div>\t\t\t<select id="select_icon" name="icon" onchange="iconpref(this.value);">';
            for (let e in mapMarkers)
                m +=
                    '<option value="' +
                    e +
                    '">' +
                    mapMarkers[e].icon.replace(/_/gi, " ") +
                    "</option>";
            m =
                m +
                '</select>\t\t\t<input type="text" id="editedtitle" name="title" value="' +
                l +
                '">\t\t\t<textarea id="editeddesc" name="desc">' +
                c +
                '</textarea>\t\t\t<button class="cancel" data-i18n="cancel">Cancel</button>\t\t\t<button class="save-marker" data-i18n="Save">Save</button>\t\t\t</div>\t\t\t<button class="remove-marker" data-i18n="remove_marker">Remove marker</button>\t\t\t<div id="remove-dialog" class="hide">\t\t\t<span class="remove-text" data-i18n="remove_text">Are you sure?</span>\t\t\t<button class="yes" data-i18n="yes">Yes</button>\t\t\t<button class="no" data-i18n="no">No</button></div>';
            let h = L.marker([i, r], {
                draggable: !1,
                icon: p,
            }).bindPopup(m);
            h.on("popupopen", onPopupOpen), e.push(h);
        }
    } else localStorage.mapUserMarkers = "[]";
    (groupUser = L.layerGroup(e)), map.addLayer(groupUser);
}
initUserLayerGroup();
let actualversion = localStorage.getItem("version");
if (null === actualversion || actualversion < 1.3) {
    localStorage.setItem("version", 1.3),
        console.log("version outdated"),
        (storageMarkers = JSON.parse(localStorage.mapUserMarkers));
    for (let e = 0; e < storageMarkers.length; e++) {
        let t = storageMarkers[e].coords.x;
        let a = storageMarkers[e].coords.y;
        (t = ((t / 2932) * 2048 + 2048).toFixed(0)),
            (a = ((a / 2932) * 2048 + 2048).toFixed(0)),
            (storageMarkers[e].coords.x = t),
            (storageMarkers[e].coords.y = a),
            (localStorage.mapUserMarkers = JSON.stringify(storageMarkers)),
            map.removeLayer(groupUser),
            initUserLayerGroup();
    }
}

function iconpref(e) {
    document.getElementById("iconprev").style.backgroundImage =
        "url(" + markerIconTypes[e].options.iconUrl + ")";
}

function titlepref(e) {
    document.getElementById("titleprev").value = e.replace(/_/gi, " ");
}

function removeMarkerE(t, a) {
    for (e in markers) {
        let i = markers[e].getLatLng();
        i.lat == t && i.lng == a && map.removeLayer(markers[e]);
    }
}

function addMarkerText(e, t) {
    let a =
        '<div class="chooseIcon" data-i18n="choose_icon">Choose Icon:</div>  <div id="iconprev" style="background-image:url(\'' +
        markerIconTypes[0].options.iconUrl +
        '\')"></div>  <form id="addmark" method="post" action="#">  <select id="select_icon" name="icon" onchange="iconpref(this.value); titlepref(this.options[this.selectedIndex].innerHTML);">';
    for (let e in mapMarkers)
        a +=
            '<option value="' +
            e +
            '">' +
            mapMarkers[e].icon.replace(/_/gi, " ") +
            "</option>";
    a =
        a +
        '</select><div class="markertitle" data-i18n="marker_title">Marker Title:</div>  <input type="text" id="titleprev" name="title" value="Arrow">  <div class="markerdesc" data-i18n="marker_desc">Marker Description:</div>  <textarea name="desc" onclick="this.value=\'\'; this.onclick = function(){}"></textarea>  <table class="coordsinputs">  <tr>  <td>X:<input type="text" readonly="readonly" name="mlon" id="mlon" maxlength="5" value="' +
        t +
        '" onKeyPress="return numonly(this,event)"></td>  <td>Y:<input id="mlat" type="text" readonly="readonly" name="mlat" maxlength="5" value="' +
        e +
        '" onKeyPress="return numonly(this,event)"></td>  </tr>  </table>  <input type="hidden" name="submit" value="true">  <button type="submit" class="send" data-i18n="add">Add</button>  </form>';
    let i = {};
    (i.lat = e),
        (i.lng = t),
        popup.setLatLng(i).setContent(a).openOn(map),
        $("#addmark").submit(function (e) {
            $(this).find("#select_icon option:selected").text();
            let t = $(this).serializeArray();
            let a = Math.round(getAObj(t, "mlat"));
            let i = Math.round(getAObj(t, "mlon"));
            t.push({
                name: "lat",
                value: a,
            }),
                t.push({
                    name: "lon",
                    value: i,
                });
            let r = [];
            void 0 !== localStorage.mapUserMarkers &&
                (r = JSON.parse(localStorage.mapUserMarkers)),
                r.push({
                    coords: {
                        x: a,
                        y: i,
                    },
                    name: getAObj(t, "title"),
                    icon: markerIconTypes[getAObj(t, "icon")],
                    iconvalue: getAObj(t, "icon"),
                    title: getAObj(t, "title"),
                    desc: getAObj(t, "desc"),
                }),
                popup._close();
            let o =
                url +
                "?m=" +
                i +
                "," +
                a +
                "&title=" +
                getAObj(t, "title") +
                "&desc=" +
                getAObj(t, "desc") +
                "&icon=" +
                getAObj(t, "icon") +
                "&";
            o = encodeURI(o);
            let n =
                '<div class="popcontent">    <p class="mtitle">' +
                getAObj(t, "title") +
                '</p>    <p class="mdesc">' +
                getAObj(t, "desc") +
                '</p>    <span class="mcoords">[ ' +
                getAObj(t, "mlon") +
                " , " +
                getAObj(t, "mlat") +
                ']</span></div>    <span class="markerlink hide">' +
                o +
                '</span>    <button class="copymarkerurl"><span class="sharetext" data-i18n="copylink">Copy link</span>    <span class="copiedmsg hide">Copied</span></button>    <button class="edit-marker" data-i18n="edit_marker">Edit marker</button>    <div id="edit-dialog" class="hide">    <div class="chooseIcon" data-i18n="choose_icon">Choose Icon:</div>    <div id="iconprev" style="background-image:url(\'' +
                markerIconTypes[0].options.iconUrl +
                '\')"></div>    <select id="select_icon" name="icon" onchange="iconpref(this.value);">';
            for (let e in mapMarkers)
                n +=
                    '<option value="' +
                    e +
                    '">' +
                    mapMarkers[e].icon.replace(/_/gi, " ") +
                    "</option>";
            n =
                n +
                '</select>    <input type="text" id="editedtitle" name="title" value="' +
                getAObj(t, "title") +
                '">    <textarea id="editeddesc" name="desc">' +
                getAObj(t, "desc") +
                '</textarea>    <button class="cancel" data-i18n="cancel">Cancel</button>    <button class="save-marker" data-i18n="Save">Save</button>    </div>    <button class="remove-marker" data-i18n="remove_marker">Remove marker</button>    <div id="remove-dialog" class="hide">    <span class="remove-text" data-i18n="remove_text">Are you sure?</span>    <button class="yes" data-i18n="yes">Yes</button>    <button class="no" data-i18n="no">No</button></div>';
            let s = L.marker(
                {
                    lat: a,
                    lng: i,
                },
                {
                    icon: markerIconTypes[getAObj(t, "icon")],
                },
            );
            s.bindPopup(n),
                s.addTo(map),
                s.on("popupopen", onPopupOpen),
                [].push(s),
                console.log(groupUser),
                groupUser.addLayer(s),
                (localStorage.mapUserMarkers = JSON.stringify(r)),
                map.addLayer(groupUser),
                e.preventDefault();
        });
}

function onPopupOpen(e) {
    let t = this;
    let a = t.getLatLng();
    console.log("clickedMarkerCoords= " + a);
    let r = e.target.getLatLng();
    console.log("clickedMarkerCoordsNew= " + r);
    let o = t.getPopup();
    $(document).off("click", ".remove-marker"),
        $(document).on("click", ".remove-marker", function () {
            $(this).addClass("hide"),
                $(this).next("#remove-dialog").removeClass("hide"),
                $(this).parent().parent().find(".popcontent").addClass("hide"),
                $(this).parent().parent().find(".edit-marker").addClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".copymarkerurl")
                    .addClass("hide");
        }),
        $(document).off("click", ".no"),
        $(document).on("click", ".no", function () {
            $(this).parent("#remove-dialog").addClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".popcontent")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".edit-marker")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".remove-marker")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".copymarkerurl")
                    .removeClass("hide");
        }),
        $(document).off("click", ".yes"),
        $(document).on("click", ".yes", function () {
            for (
                storageMarkers = JSON.parse(localStorage.mapUserMarkers),
                    i = storageMarkers.length;
                i > -1;
                i--
            )
                void 0 !== storageMarkers[i] &&
                    a.lat == storageMarkers[i].coords.x &&
                    a.lng == storageMarkers[i].coords.y &&
                    (storageMarkers.splice(i, 1),
                    (localStorage.mapUserMarkers =
                        JSON.stringify(storageMarkers)));
            map.removeLayer(t), groupUser.removeLayer(t);
        }),
        $(document).off("click", ".edit-marker"),
        $(document).on("click", ".edit-marker", function () {
            for (
                storageMarkers = JSON.parse(localStorage.mapUserMarkers),
                    i = storageMarkers.length;
                i > -1;
                i--
            )
                void 0 !== storageMarkers[i] &&
                    a.lat == storageMarkers[i].coords.x &&
                    a.lng == storageMarkers[i].coords.y &&
                    ($(this)
                        .parent()
                        .find("#iconprev")
                        .css(
                            "background-image",
                            "url(" +
                                storageMarkers[i].icon.options.iconUrl +
                                ")",
                        ),
                    $(this)
                        .parent()
                        .find("#select_icon")
                        .val(storageMarkers[i].iconvalue));
            $(this).addClass("hide"),
                $(this).next("#edit-dialog").removeClass("hide"),
                $(this).parent().parent().find(".popcontent").addClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".remove-marker")
                    .addClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".copymarkerurl")
                    .addClass("hide");
        }),
        $(document).off("click", ".cancel"),
        $(document).on("click", ".cancel", function () {
            $(this).parent().parent().find("#edit-dialog").addClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".popcontent")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".edit-marker")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".remove-marker")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".copymarkerurl")
                    .removeClass("hide"),
                o._close();
        }),
        $(document).off("click", ".save-marker"),
        $(document).on("click", ".save-marker", function () {
            for (
                storageMarkers = JSON.parse(localStorage.mapUserMarkers),
                    i = storageMarkers.length;
                i > -1;
                i--
            )
                if (
                    void 0 !== storageMarkers[i] &&
                    a.lat == storageMarkers[i].coords.x &&
                    a.lng == storageMarkers[i].coords.y
                ) {
                    let e = $(this).parent().find("select[name=icon]").val();
                    let r = $(this).parent().find("#editedtitle").val();
                    let n = $(this).parent().find("#editeddesc").val();
                    let s =
                        url +
                        "?m=" +
                        a.lng +
                        "," +
                        a.lat +
                        "&title=" +
                        r +
                        "&desc=" +
                        n +
                        "&icon=" +
                        e +
                        "&";
                    s = encodeURI(s);
                    let l =
                        '<div class="popcontent"><p class="mtitle">' +
                        r +
                        '</p><p class="mdesc">' +
                        n +
                        '</p><span class="mcoords">[ ' +
                        a.lng +
                        " , " +
                        a.lat +
                        ']</span></div><span class="markerlink hide">' +
                        s +
                        '</span><button class="copymarkerurl"><span class="sharetext" data-i18n="copylink">Copy link</span><span class="copiedmsg hide">Copied</span></button><button class="edit-marker" data-i18n="edit_marker">Edit marker</button><div id="edit-dialog" class="hide"><div class="chooseIcon" data-i18n="choose_icon">Choose Icon:</div>  <div id="iconprev" style="background-image:url(\'' +
                        markerIconTypes[0].options.iconUrl +
                        '\')"></div>  <select id="select_icon" name="icon" onchange="iconpref(this.value);">';
                    for (let e in mapMarkers)
                        l +=
                            '<option value="' +
                            e +
                            '">' +
                            mapMarkers[e].icon.replace(/_/gi, " ") +
                            "</option>";
                    (l =
                        l +
                        '</select><input type="text" id="editedtitle" name="title" value="' +
                        r +
                        '"><textarea id="editeddesc" name="desc">' +
                        n +
                        '</textarea><button class="cancel" data-i18n="cancel">Cancel</button><button class="save-marker" data-i18n="Save">Save</button></div><button class="remove-marker" data-i18n="remove_marker">Remove marker</button><div id="remove-dialog" class="hide"><span class="remove-text" data-i18n="remove_text">Are you sure?</span><button class="yes" data-i18n="yes">Yes</button><button class="no" data-i18n="no">No</button></div>'),
                        o.setContent(l),
                        t.setIcon(markerIconTypes[e]),
                        (storageMarkers[i].name = r),
                        (storageMarkers[i].title = r),
                        (storageMarkers[i].desc = n),
                        (storageMarkers[i].icon = markerIconTypes[e]),
                        (storageMarkers[i].iconvalue = e),
                        (localStorage.mapUserMarkers =
                            JSON.stringify(storageMarkers));
                }
            o._close();
        });
}
$("#usermarkers").click(function () {
    1 == $(this).prop("checked")
        ? map.addLayer(groupUser)
        : 0 == $(this).prop("checked") && map.removeLayer(groupUser);
}),
    map.on("click", function (e) {
        let t = Math.round(e.latlng.lat);
        let a = Math.round(e.latlng.lng);
        a < 0 || a > 4095 || t < 0 || t > 4095
            ? console.log("lat: " + t + "long: " + a)
            : ((message =
                  '<span class="coordsinfo">X: ' +
                  a +
                  " Y: " +
                  t +
                  '</span><br><button class="add-marker" data-i18n="add_marker" onclick="addMarkerText(' +
                  t +
                  "," +
                  a +
                  ')">Add marker</button>'),
              popup.setLatLng(e.latlng).setContent(message).openOn(map));
    });
let sharedMarker = getUrlVars().m;
if (null != sharedMarker) {
    sidebar.close();
    let e = getUrlVars().icon;
    let t = getUrlVars().title;
    t = decodeURIComponent(t);
    let a = getUrlVars().desc;
    a = decodeURIComponent(a);
    let i = sharedMarker.split(",")[1];
    let r = sharedMarker.split(",")[0];
    console.log(t), console.log(a);
    let o =
        '<div class="popcontent"><p class="mtitle">' +
        t +
        '</p><p class="mdesc">' +
        a +
        '</p><span class="mcoords">X: ' +
        r +
        " Y: " +
        i +
        '</span></div><button class="edit-marker" data-i18n="edit_marker">Edit marker</button><div id="edit-dialog" class="hide"><div class="chooseIcon" data-i18n="choose_icon">Choose Icon:</div><div id="iconprev" style="background-image:url(\'' +
        markerIconTypes[e].options.iconUrl +
        '\')"></div><select id="select_icon" name="icon" onchange="iconpref(this.value);">';
    for (let e in mapMarkers)
        o +=
            '<option value="' +
            e +
            '">' +
            mapMarkers[e].icon.replace(/_/gi, " ") +
            "</option>";
    if (
        ((o =
            o +
            '</select><input type="text" id="editedtitle" name="title" value="' +
            t +
            '"><textarea id="editeddesc" name="desc">' +
            a +
            '</textarea><button class="cancel" data-i18n="cancel">Cancel</button><button class="save-marker" data-i18n="Save">Save</button></div><button class="remove-marker" data-i18n="remove_marker">Remove marker</button><div id="remove-dialog" class="hide"><span class="remove-text" data-i18n="remove_text">Are you sure?</span><button class="yes" data-i18n="yes">Yes</button><button class="no" data-i18n="no">No</button></div>'),
        i <= mapBounds && i > 0 && r <= mapBounds && r > 0)
    ) {
        let t = L.marker([i, r], {
            icon: markerIconTypes[e],
        })
            .bindPopup(o)
            .addTo(map);
        map.flyTo(t.getLatLng(), 4),
            t.on("popupopen", onPopupOpenShared),
            t.openPopup();
    }
}

function onPopupOpenShared() {
    let e = this;
    let t = e.getLatLng();
    let a = e.getPopup();
    let i = getUrlVars().icon;
    let r = getUrlVars().title;
    r = decodeURIComponent(r);
    let o = getUrlVars().desc;
    o = decodeURIComponent(o);
    let n = sharedMarker.split(",")[1];
    let s = sharedMarker.split(",")[0];
    let l = markerIconTypes[i].options.iconUrl;
    $(document).off("click", ".remove-marker"),
        $(document).on("click", ".remove-marker", function () {
            $(this).addClass("hide"),
                $(this).next("#remove-dialog").removeClass("hide"),
                $(this).parent().parent().find(".popcontent").addClass("hide"),
                $(this).parent().parent().find(".edit-marker").addClass("hide");
        }),
        $(document).off("click", ".no"),
        $(document).on("click", ".no", function () {
            $(this).parent("#remove-dialog").addClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".popcontent")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".edit-marker")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".remove-marker")
                    .removeClass("hide");
        }),
        $(document).off("click", ".yes"),
        $(document).on("click", ".yes", function () {
            map.removeLayer(e);
        }),
        $(document).off("click", ".edit-marker"),
        $(document).on("click", ".edit-marker", function () {
            (storageMarkers = JSON.parse(localStorage.mapUserMarkers)),
                $(this)
                    .parent()
                    .find("#iconprev")
                    .css("background-image", "url(" + l + ")"),
                $(this).parent().find("#select_icon").val(i),
                $(this).addClass("hide"),
                $(this).next("#edit-dialog").removeClass("hide"),
                $(this).parent().parent().find(".popcontent").addClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".remove-marker")
                    .addClass("hide");
        }),
        $(document).off("click", ".cancel"),
        $(document).on("click", ".cancel", function () {
            $(this).parent().parent().find("#edit-dialog").addClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".popcontent")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".edit-marker")
                    .removeClass("hide"),
                $(this)
                    .parent()
                    .parent()
                    .find(".remove-marker")
                    .removeClass("hide");
        }),
        $(document).off("click", ".save-marker"),
        $(document).on("click", ".save-marker", function () {
            storageMarkers = JSON.parse(localStorage.mapUserMarkers);
            let i = $(this).parent().find("select[name=icon]").val();
            let r = $(this).parent().find("#editedtitle").val();
            let o = $(this).parent().find("#editeddesc").val();
            let l =
                '<div class="popcontent"><p class="mtitle">' +
                r +
                '</p><p class="mdesc">' +
                o +
                '</p><span class="mcoords">[ ' +
                t.lng +
                " , " +
                t.lat +
                ']</span></div><button class="edit-marker" data-i18n="edit_marker">Edit marker</button><div id="edit-dialog" class="hide"><div class="chooseIcon" data-i18n="choose_icon">Choose Icon:</div>  <div id="iconprev" style="background-image:url(\'' +
                markerIconTypes[0].options.iconUrl +
                '\')"></div>  <select id="select_icon" name="icon" onchange="iconpref(this.value);">';
            for (let e in mapMarkers)
                l +=
                    '<option value="' +
                    e +
                    '">' +
                    mapMarkers[e].icon.replace(/_/gi, " ") +
                    "</option>";
            (l =
                l +
                '</select><input type="text" id="editedtitle" name="title" value="' +
                r +
                '"><textarea id="editeddesc" name="desc">' +
                o +
                '</textarea><button class="cancel" data-i18n="cancel">Cancel</button><button class="save-marker" data-i18n="Save">Save</button></div><button class="remove-marker" data-i18n="remove_marker">Remove marker</button><div id="remove-dialog" class="hide"><span class="remove-text" data-i18n="remove_text">Are you sure?</span><button class="yes" data-i18n="yes">Yes</button><button class="no" data-i18n="no">No</button></div>'),
                a.setContent(l),
                storageMarkers.push({
                    coords: {
                        x: n,
                        y: s,
                    },
                    name: r,
                    icon: markerIconTypes[i],
                    iconvalue: i,
                    title: r,
                    desc: o,
                }),
                e.setIcon(markerIconTypes[i]),
                (localStorage.mapUserMarkers = JSON.stringify(storageMarkers)),
                map.removeLayer(e),
                initUserLayerGroup(),
                a._close();
        });
}

function getFormattedTime() {
    let e = new Date();
    let t = e.getFullYear();
    let a = ("0" + (e.getMonth() + 1)).slice(-2);
    let i = e.getDate();
    let r = e.getHours();
    let o = e.getMinutes();
    e.getSeconds();
    return t + "-" + a + "-" + i + "_" + r + "." + o;
}
$(document).on("click", ".clearls", function () {
    $(this).addClass("hide"), $(this).next(".prompt").removeClass("hide");
}),
    $(document).on("click", ".clearyes", function () {
        $(this).parent(".prompt").addClass("hide"),
            localStorage.setItem("mapUserMarkers", "[]"),
            map.removeLayer(groupUser),
            initUserLayerGroup();
    }),
    $(document).on("click", ".clearno", function () {
        $(this).parent(".prompt").addClass("hide");
    }),
    $(".backupls").on("click", function (e) {
        let t = {};
        let a = localStorage.mapUserMarkers;
        let i = localStorage.langactive;
        (t.markers = a), (t.langactive = i);
        let r = JSON.stringify(t);
        let o = "data:text/javascript;charset=utf-8;base64," + btoa(r);
        let n = document.createElement("a");
        n.setAttribute("download", "kcdmap_" + getFormattedTime() + ".json"),
            n.setAttribute("href", o),
            document.querySelector("body").appendChild(n),
            n.click(),
            n.remove();
    }),
    $(".restorels").on("click", function (e) {
        let t = document.createElement("div");
        t.className = "restoreWindowOverlay";
        let a = document.createElement("div");
        a.className = "restoreWindow";
        let i = document.createElement("a");
        (i.className = "restoreWindowX"),
            i.appendChild(document.createTextNode("×")),
            i.setAttribute("href", "#"),
            a.appendChild(i),
            (i.onclick = function () {
                t.remove();
            });
        let r = document.createElement("input");
        r.setAttribute("type", "file"),
            r.setAttribute("id", "fileinput"),
            (r.onchange = function (e) {
                t.remove();
                let a = e.target.files[0];
                if (a) {
                    let e = new FileReader();
                    (e.onload = function (e) {
                        let t = e.target.result;
                        (t = JSON.parse(t)),
                            localStorage.setItem("mapUserMarkers", t.markers),
                            localStorage.setItem("langactive", t.langactive),
                            initUserLayerGroup(),
                            alert("Imported markers from backup.");
                    }),
                        e.readAsText(a);
                } else alert("Failed to load file");
            });
        let o = document.createElement("h3");
        (o.className = "restoreTitle"),
            o.appendChild(document.createTextNode("Select file with backup")),
            a.appendChild(o),
            a.appendChild(r),
            t.appendChild(a),
            document.querySelector("body").appendChild(t);
    }),
    $(".toggle-title").click(function () {
        $(this).toggleClass("active"),
            $(this).next(".hidden-content").slideToggle(500);
    }),
    $(".toggle-content").click(function () {
        $(this).toggleClass("active"),
            $(this).next(".hidden-content").slideToggle(500);
    });
let langactive = localStorage.getItem("langactive");
null === langactive
    ? (localStorage.setItem("langactive", "en"),
      $(".langswitch").find(".lang[data-lang='en']").addClass("active"),
      $(".langswitch")
          .find(".lang[data-lang='en']")
          .find(".checkmark")
          .addClass("active"))
    : ($(".langswitch")
          .find(".lang[data-lang=" + langactive + "]")
          .addClass("active"),
      $(".langswitch")
          .find(".lang[data-lang=" + langactive + "]")
          .find(".checkmark")
          .addClass("active")),
    $(".lang").click(function () {
        localStorage.setItem("langactive", $(this).data("lang")),
            $(this).parent().find(".lang-text").removeClass("active"),
            $(this).find(".lang-text").addClass("active"),
            $(this).parent().find(".lang").removeClass("active"),
            $(this).addClass("active"),
            $(this).parent().find(".checkmark").removeClass("active"),
            $(this).find(".checkmark").addClass("active");
    }),
    $(".markers-list input").on("change", function () {
        let e;
        let t = [];
        $(".markers-list input").each(function () {
            (e = {
                id: $(this).attr("id"),
                value: $(this).prop("checked"),
            }),
                t.push(e);
        }),
            localStorage.setItem("activemarkers", JSON.stringify(t));
    });

let activemarkers = JSON.parse(localStorage.getItem("activemarkers"));

if (localStorage.activemarkers) {
    for (let e = 0; e < activemarkers.length; e++) {
        $("#" + activemarkers[e].id).prop("checked", activemarkers[e].value);
        if (activemarkers[e].value) {
            $("#allmarkers").prop("checked", false);
            map.addLayer(layerGroups[activemarkers[e].id]);
        }
    }
}
