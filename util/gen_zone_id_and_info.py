#!/usr/bin/env python

import coinach
import csv
import csv_util
import json
import os
import re

# cactbot calls this "zone" largely because the id here is relative to the
# zone change event.  It corresponds to the TerritoryType.ID directly
# however, the name in ZoneId and the info in ZoneInfo contain information
# from other tables like PlaceName and TerritoryType, so it's not strictly
# about Territory.  Hence, "zone" as a short-to-type catch-all.
_ZONE_ID_OUTPUT_FILE = "zone_id.ts"
_ZONE_INFO_OUTPUT_FILE = "zone_info.ts"
_CONTENT_TYPE_OUTPUT_FILE = "content_type.ts"

# name_key to territory_id mappings for locations with conflicts
# these will only be added if the name is correct and will throw
# errors if not found.
known_ids = {
    "TheDiadem": 929,
}

# name_key to territory_id mappings for locations that no longer
# exist.  This is for things that have been taken out of the
# game.  This will throw errors if anything conflicts.
synthetic_ids = {
    "TheAkhAfahAmphitheatreUnreal": 930,
    "TheNavelUnreal": 953,
    "TheWhorleaterUnreal": 972,
    "UltimasBaneUnreal": 1035,
    "TheMaskedCarnivale": 796,
    # Dungeons and trials replaced by 6.2 revamp
    "Snowcloak61": 371,
    "SohmAl61": 441,
    "TheAery61": 435,
    "TheKeeperOfTheLake61": 150,
    "TheStepsOfFaith61": 143,
    "TheVault61": 421,
    "ThornmarchHard61": 207,
}

synthetic_zone_info = {
    930: {
        "contentType": 4,
        "exVersion": 3,
        "name": {
            "cn": "希瓦幻巧战",
            "de": "Traumprüfung - Shiva",
            "en": "The Akh Afah Amphitheatre (Unreal)",
            "fr": "L'Amphithéâtre d'Akh Afah (irréel)",
            "ja": "幻シヴァ討滅戦",
            "ko": "환 시바 토벌전",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 400,
        "weatherRate": 46,
    },
    953: {
        "contentType": 4,
        "exVersion": 3,
        "name": {
            "cn": "泰坦幻巧战",
            "de": "Traumprüfung - Titan",
            "en": "The Navel (Unreal)",
            "fr": "Le Nombril (irréel)",
            "ja": "幻タイタン討滅戦",
            "ko": "환 타이탄 토벌전",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 400,
        "weatherRate": 23,
    },
    972: {
        "contentType": 4,
        "exVersion": 3,
        "name": {
            "cn": "利维亚桑幻巧战",
            "de": "Traumprüfung - Leviathan",
            "en": "The <Emphasis>Whorleater</Emphasis> (Unreal)",
            "fr": "Le Briseur de marées (irréel)",
            "ja": "幻リヴァイアサン討滅戦",
            "ko": "환 리바이어선 토벌전",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 400,
        "weatherRate": 38,
    },
    1035: {
        "contentType": 4,
        "exVersion": 4,
        "name": {
            "cn": "究极神兵幻巧战",
            "de": "Traumprüfung - Ultima",
            "en": "Ultima's Bane (Unreal)",
            "fr": "Le fléau d'Ultima (irréel)",
            "ja": "幻アルテマウェポン破壊作戦",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 400,
        "weatherRate": 31,
    },
    # Dungeons and trials replaced by 6.2 revamp
    143: {
        "contentType": 4,
        "exVersion": 0,
        "name": {
            "cn": "(6.1)皇都伊修加德保卫战",
            "de": "(6.1)Der Schicksalsweg",
            "en": "(6.1)The Steps of Faith",
            "fr": "(6.1)Le Siège de la sainte Cité d'Ishgard",
            "ja": "(6.1)皇都イシュガルド防衛戦",
            "ko": "(6.1)성도 이슈가르드 방어전",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 200,
        "weatherRate": 28,
    },
    150: {
        "contentType": 2,
        "exVersion": 0,
        "name": {
            "cn": "(6.1)幻龙残骸密约之塔",
            "de": "(6.1)Hüter des Sees",
            "en": "(6.1)The Keeper of the Lake",
            "fr": "(6.1)Le Gardien du lac",
            "ja": "(6.1)幻龍残骸 黙約の塔",
            "ko": "(6.1)묵약의 탑",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 200,
        "weatherRate": 74,
    },
    207: {
        "contentType": 4,
        "exVersion": 0,
        "name": {
            "cn": "(6.1)莫古力贤王歼灭战",
            "de": "(6.1)Königliche Konfrontation (schwer)",
            "en": "(6.1)Thornmarch (Hard)",
            "fr": "(6.1)La Lisière de ronces (brutal)",
            "ja": "(6.1)善王モグル・モグXII世討滅戦",
            "ko": "(6.1)선왕 모그루 모그 XII세 토벌전",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 400,
        "weatherRate": 30,
    },
    371: {
        "contentType": 2,
        "exVersion": 0,
        "name": {
            "cn": "(6.1)凛冽洞天披雪大冰壁",
            "de": "(6.1)Das Schneekleid",
            "en": "(6.1)Snowcloak",
            "fr": "(6.1)Manteneige",
            "ja": "(6.1)氷結潜窟 スノークローク大氷壁",
            "ko": "(6.1)얼음외투 대빙벽",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 200,
        "weatherRate": 42,
    },
    421: {
        "contentType": 2,
        "exVersion": 1,
        "name": {
            "cn": "(6.1)圣教中枢伊修加德教皇厅",
            "de": "(6.1)Erzbasilika",
            "en": "(6.1)The Vault",
            "fr": "(6.1)La Voûte",
            "ja": "(6.1)強硬突入 イシュガルド教皇庁",
            "ko": "(6.1)이슈가르드 교황청",
        },
        "offsetX": 0,
        "offsetY": 0,
        "sizeFactor": 200,
        "weatherRate": 0,
    },
    435: {
        "contentType": 2,
        "exVersion": 1,
        "name": {
            "cn": "(6.1)邪龙王座龙巢神殿",
            "de": "(6.1)Nest des Drachen",
            "en": "(6.1)The Aery",
            "fr": "(6.1)L'Aire",
            "ja": "(6.1)邪竜血戦 ドラゴンズエアリー",
            "ko": "(6.1)용의 둥지",
        },
        "offsetX": -40,
        "offsetY": 55,
        "sizeFactor": 200,
        "weatherRate": 28,
    },
    441: {
        "contentType": 2,
        "exVersion": 1,
        "name": {
            "cn": "(6.1)天山绝顶索姆阿尔灵峰",
            "de": "(6.1)Sohm Al",
            "en": "(6.1)Sohm Al",
            "fr": "(6.1)Sohm Al",
            "ja": "(6.1)霊峰踏破 ソーム・アル",
            "ko": "(6.1)솜 알",
        },
        "offsetX": 185,
        "offsetY": 51,
        "sizeFactor": 200,
        "weatherRate": 0,
    },
}

synthetic_content_type = {
    "MaskedCarnivale": 27,
}

# Notes: use rawexd here instead of exd to get place ids / territory ids
# instead of the lookups for PlaceName / TerritoryType that are not unique.
# The connections here are:
#   TerritoryType has Map, PlaceName, anonymous ContentFinderCondition (but not all have this)
#   ContentFinderCondition has Name, TerritoryType (but not all TerritoryType has CFC)
#   PlaceName has Name
#
# Name-finding Algorithm:
# Look up TerritoryType
# if it has a CFC: use that
# else if CFC has a TerritoryType that matches: use that
# else: use PlaceName


def make_territory_map(contents):
    inputs = [
        "#",
        11,
        "PlaceName",
        "Name",
        "WeatherRate",
        "Map",
        "TerritoryIntendedUse",
        "ExVersion",
    ]
    outputs = [
        "territory_id",
        "cfc_id",
        "place_id",
        "name",
        "weather_rate",
        "map_id",
        "territory_intended_use",
        "ex_version",
    ]
    return csv_util.make_map(contents, inputs, outputs)


def make_place_name_map(contents):
    inputs = ["#", "Name"]
    outputs = ["place_id", "place_name"]
    return csv_util.make_map(contents, inputs, outputs)


def make_cfc_map(contents):
    inputs = ["#", "TerritoryType", "Name", "ContentType"]
    outputs = ["cfc_id", "territory_id", "name", "content_type_id"]
    return csv_util.make_map(contents, inputs, outputs)


# :eyes:
def make_map_map(contents):
    inputs = ["#", "SizeFactor", "Offset{X}", "Offset{Y}"]
    outputs = ["map_id", "size_factor", "offset_x", "offset_y"]
    return csv_util.make_map(contents, inputs, outputs)


def make_content_type_map(contents):
    inputs = ["#", "Name"]
    outputs = ["content_type_id", "name"]
    return csv_util.make_map(contents, inputs, outputs)


def print_error(header, what, map, key):
    print("%s %s: %s" % (header, what, json.dumps(map[key])))


def generate_name_data(territory_map, cfc_map, place_name_map):
    map = {}
    map["MatchAll"] = None
    territory_to_cfc_map = {}

    cfc_names = set()
    collision_names = set()

    # Build territory name to cfc id map.  Collisions have value None.
    territory_to_cfc = {}
    for cfc_id, cfc in cfc_map.items():
        territory_id = cfc["territory_id"]

        # Collision?
        if territory_id in territory_to_cfc:
            territory_to_cfc[territory_id] = None
        territory_to_cfc[territory_id] = cfc_id

    # First pass, find everything with a cfc name.
    # These take precedence over any later collisions.
    for territory_id, territory in territory_map.items():
        cfc_id = territory["cfc_id"]
        if cfc_id == "0":
            continue
        raw_name = cfc_map[cfc_id]["name"]
        name_key = csv_util.clean_name(raw_name)
        if not name_key:
            continue
        cfc_names.add(name_key)

    # Second pass, generate all the names, giving cfc names priority.
    for territory_id, territory in territory_map.items():
        cfc_id = territory["cfc_id"]
        place_id = territory["place_id"]
        place_name = place_name_map[place_id]["place_name"]
        territory_name = territory["name"]

        cfc_id_for_name = None

        is_town_zone = territory["territory_intended_use"] == "0"
        is_overworld_zone = territory["territory_intended_use"] == "1"

        if cfc_id != "0":
            cfc_id_for_name = cfc_id
            name_key = csv_util.clean_name(cfc_map[cfc_id]["name"])
        elif territory_id in territory_to_cfc and territory_to_cfc[territory_id]:
            cfc_id_for_name = territory_to_cfc[territory_id]
            name_key = csv_util.clean_name(cfc_map[cfc_id_for_name]["name"])
        elif is_town_zone or is_overworld_zone:
            # World zones like Middle La Noscea are not in CFC.
            name_key = csv_util.clean_name(place_name)
            # Names from ContentFinderCondition take precedence over
            # territory names.  There are some duplicates, such as
            # The Copied Factory version you can walk around in.
            if name_key in cfc_names:
                continue
        else:
            # TODO: add a verbose option
            # print_error("skipping", place_name, territory_map, territory_id)
            continue

        if not name_key:
            continue

        # If we've already seen this twice, ignore.
        if name_key in collision_names:
            print_error("collision", name_key, territory_map, territory_id)
            continue

        # Ignore collisions with known ids.
        if name_key in known_ids and known_ids[name_key] != int(territory_id):
            print_error("skipping", name_key, territory_map, territory_id)
            continue

        # If this is a collision with an existing name,
        # remove the old one.
        if name_key in map:
            collision_names.add(name_key)
            print_error("collision", name_key, territory_map, str(map[name_key]))
            print_error("collision", name_key, territory_map, territory_id)
            map.pop(name_key)
            continue

        territory_to_cfc_map[territory_id] = cfc_id_for_name

        map[name_key] = int(territory_id)

    for name, id in known_ids.items():
        if not name in map:
            raise Exception("Missing known item", name)

    for name, id in synthetic_ids.items():
        if name in map:
            raise Exception("Conflicting synthetic item", name)
        map[name] = id

    # map is what gets written to zone_id.ts, but it's also useful to keep additional information
    # about where the name came from.
    return map, territory_to_cfc_map


def generate_zone_info(
    territory_map, cfc_map_by_lang, map_map, territory_to_cfc_map, place_name_map_by_lang
):
    map = {}

    for id, info in synthetic_zone_info.items():
        map[str(id)] = info

    # The first letter of zones starting with articles are not capitalized.
    def capitalize(str):
        # can't use built in capitalize() as that lowercases non-first words @_@
        return str[0].upper() + str[1:]

    for territory_id in territory_to_cfc_map:
        output = {}
        map[territory_id] = output

        territory = territory_map[territory_id]
        place_id = territory["place_id"]

        output["weatherRate"] = int(territory["weather_rate"])
        output["exVersion"] = int(territory["ex_version"])

        cfc_id = territory_to_cfc_map[territory_id]
        if cfc_id == None:
            output["name"] = {}
            for lang in place_name_map_by_lang:
                place_map = place_name_map_by_lang[lang]
                if place_id in place_map:
                    place_name = place_map[place_id]["place_name"]
                    if place_name:
                        output["name"][lang] = capitalize(place_name)
        else:
            output["name"] = {}
            for lang in cfc_map_by_lang:
                cfc_map = cfc_map_by_lang[lang]
                if cfc_id in cfc_map:
                    cfc_name = cfc_map[cfc_id]["name"]
                    if cfc_name:
                        output["name"][lang] = capitalize(cfc_name)
            output["contentType"] = int(cfc_map_by_lang["en"][cfc_id]["content_type_id"])

        map_id = territory["map_id"]
        if map_id in map_map:
            map_info = map_map[map_id]
            output["sizeFactor"] = int(map_info["size_factor"])
            output["offsetX"] = int(map_info["offset_x"])
            output["offsetY"] = int(map_info["offset_y"])
        else:
            print("missing map: %s" % territory_id)

    return map


def generate_content_type(content_type_map):
    map = {}
    for id, content_type in content_type_map.items():
        name = content_type["name"]
        if not name:
            continue
        map[csv_util.clean_name(name)] = int(id)
    for id, content_type in synthetic_content_type.items():
        map[id] = content_type
    return map


if __name__ == "__main__":
    # TODO: make an arg parser for non-default paths
    reader = coinach.CoinachReader(verbose=True)
    writer = coinach.CoinachWriter(verbose=True)

    territory_map = make_territory_map(reader.rawexd("TerritoryType"))
    place_name_map = make_place_name_map(reader.rawexd("PlaceName"))
    cfc_map = make_cfc_map(reader.rawexd("ContentFinderCondition"))
    map_map = make_map_map(reader.rawexd("Map"))

    name_data, territory_to_cfc_map = generate_name_data(territory_map, cfc_map, place_name_map)

    writer.writeTypeScript(
        filename=os.path.join("resources", _ZONE_ID_OUTPUT_FILE),
        scriptname=os.path.basename(os.path.abspath(__file__)),
        header=None,
        type=None,
        as_const=True,
        data=name_data,
    )

    # Build up multiple languages here, for translations.
    place_name_map_by_lang = {"en": place_name_map}
    cfc_map_by_lang = {"en": cfc_map}

    # There are only csvs for English, so use Coinach to get these files.
    coinach_langs = [
        "de",
        "fr",
        "ja",
    ]
    for lang in coinach_langs:
        place_name_map_by_lang[lang] = make_place_name_map(reader.rawexd("PlaceName", lang))
        cfc_map_by_lang[lang] = make_cfc_map(reader.rawexd("ContentFinderCondition", lang))

    # SaintCoinach can't do Chinese or Korean, unless you have that version, so use csvs.
    csv_langs = [
        "cn",
        "ko",
    ]
    for lang in csv_langs:
        place_name_csv = csv_util.get_raw_csv("PlaceName", lang)
        place_name_map_by_lang[lang] = make_place_name_map(place_name_csv)
        cfc_csv = csv_util.get_raw_csv("ContentFinderCondition", lang)
        cfc_map_by_lang[lang] = make_cfc_map(cfc_csv)

    territory_info = generate_zone_info(
        territory_map, cfc_map_by_lang, map_map, territory_to_cfc_map, place_name_map_by_lang
    )

    zone_info_header = """import { LocaleText } from '../types/trigger';

type ZoneInfoType = {
  [zoneId: number]: {
    readonly exVersion: number;
    readonly contentType?: number;
    readonly name: LocaleText;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly sizeFactor: number;
    readonly weatherRate: number;
  };
};"""

    writer.writeTypeScript(
        filename=os.path.join("resources", _ZONE_INFO_OUTPUT_FILE),
        scriptname=os.path.basename(os.path.abspath(__file__)),
        header=zone_info_header,
        type="ZoneInfoType",
        as_const=True,
        data=territory_info,
    )

    content_type_map = make_content_type_map(reader.rawexd("ContentType"))
    writer.writeTypeScript(
        filename=os.path.join("resources", _CONTENT_TYPE_OUTPUT_FILE),
        scriptname=os.path.basename(os.path.abspath(__file__)),
        header=None,
        type=None,
        as_const=True,
        data=generate_content_type(content_type_map),
    )
