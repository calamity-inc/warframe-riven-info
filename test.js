const { parseRiven } = require("./RivenParser.js");

function assert(bool) {
    if (!bool) {
        throw new Error("Assertion failed");
    }
}

// Assert parsed data matches in-game values - Real Rivens

{
    const { name, stats } = parseRiven(
        "PlayerMeleeWeaponRandomModRare",
        JSON.parse("{\"lvl\":8,\"buffs\":[{\"Tag\":\"WeaponMeleeDamageMod\",\"Value\":40881867},{\"Tag\":\"WeaponElectricityDamageMod\",\"Value\":176959},{\"Tag\":\"WeaponFireRateMod\",\"Value\":257573658}],\"curses\":[{\"Tag\":\"WeaponArmorPiercingDamageMod\",\"Value\":400514956}]}"),
        1.10
    );
    assert(name == "Croni-visitio");
    assert(stats[0].tag == "WeaponMeleeDamageMod");
    assert(stats[0].displayValue == 154.2);
    assert(stats[1].tag == "WeaponElectricityDamageMod");
    assert(stats[1].displayValue == 83.5);
    assert(stats[2].tag == "WeaponFireRateMod");
    assert(stats[2].displayValue == 53.7);
    assert(stats[3].tag == "WeaponArmorPiercingDamageMod");
    assert(stats[3].displayValue == -96.2);
}

{
    const { name, stats } = parseRiven(
        "LotusPistolRandomModRare",
        JSON.parse("{\"lvl\":8,\"buffs\":[{\"Tag\":\"WeaponReloadSpeedMod\",\"Value\":1031084030},{\"Tag\":\"WeaponProjectileSpeedMod\",\"Value\":979115818},{\"Tag\":\"WeaponFreezeDamageMod\",\"Value\":287446961}],\"curses\":[]}"),
        1.00
    );
    assert(name == "Feva-concido");
    assert(stats[0].tag == "WeaponReloadSpeedMod");
    assert(stats[0].displayValue == 40.9);
    assert(stats[1].tag == "WeaponProjectileSpeedMod");
    assert(stats[1].displayValue == 73.1);
    assert(stats[2].tag == "WeaponFreezeDamageMod");
    assert(stats[2].displayValue == 64.4);
}

{
    const { name, stats } = parseRiven(
        "LotusRifleRandomModRare",
        JSON.parse("{\"lvl\":8,\"buffs\":[{\"Tag\":\"WeaponElectricityDamageMod\",\"Value\":258268665},{\"Tag\":\"WeaponClipMaxMod\",\"Value\":57385833},{\"Tag\":\"WeaponStunChanceMod\",\"Value\":590970762}],\"curses\":[{\"Tag\":\"WeaponAmmoMaxMod\",\"Value\":462255655}]}"),
        1.30
    );
    assert(name == "Hexa-vexitin");
    assert(stats[0].tag == "WeaponElectricityDamageMod");
    assert(stats[0].displayValue == 104);
    assert(stats[1].tag == "WeaponClipMaxMod");
    assert(stats[1].displayValue == 55.5);
    assert(stats[2].tag == "WeaponStunChanceMod");
    assert(stats[2].displayValue == 110.8);
    assert(stats[3].tag == "WeaponAmmoMaxMod");
    assert(stats[3].displayValue == -48);
}

// Assert parsed data matches in-game values - Contrived Rivens

{
    const { name, stats } = parseRiven(
        "LotusRifleRandomModRare",
        JSON.parse("{\"compat\":\"/Lotus/Weapons/Tenno/Rifle/LotusRifle\",\"lim\":0,\"lvlReq\":0,\"lvl\":8,\"rerolls\":69420,\"pol\":\"AP_DEFENSE\",\"buffs\":[{\"Tag\":\"WeaponFireRateMod\",\"Value\":4294967295},{\"Tag\":\"WeaponFireRateMod\",\"Value\":1073741823}],\"curses\":[]}"),
        0.65
    );
    assert(name == "dradra");
    assert(stats[0].tag == "WeaponFireRateMod");
    assert(stats[0].displayValue == 34.8);
    assert(stats[1].tag == "WeaponFireRateMod");
    assert(stats[1].displayValue == 42.5);
}

{
    const { name } = parseRiven(
        "PlayerMeleeWeaponRandomModRare",
        JSON.parse("{\"compat\":\"/Lotus/Weapons/Tenno/Melee/Glaives/LightGlaive/LightGlaiveWeapon\",\"lim\":0,\"lvlReq\":0,\"lvl\":8,\"rerolls\":69420,\"pol\":\"AP_DEFENSE\",\"buffs\":[{\"Tag\":\"WeaponFireRateMod\",\"Value\":0},{\"Tag\":\"WeaponMeleeDamageMod\",\"Value\":1073741823}],\"curses\":[{\"Tag\":\"WeaponSlashDamageMod\",\"Value\":1073741823}]}"),
        1
    );
    assert(name == "Visidra");
}

{
    const { name } = parseRiven(
        "PlayerMeleeWeaponRandomModRare",
        JSON.parse("{\"compat\":\"/Lotus/Weapons/Tenno/Melee/PlayerMeleeWeapon\",\"lim\":0,\"lvl\":8,\"lvlReq\":0,\"rerolls\":1337,\"pol\":\"AP_ANY\",\"buffs\":[{\"Tag\":\"WeaponCritDamageMod\",\"Value\":1073741823},{\"Tag\":\"WeaponCritChanceMod\",\"Value\":1073741823},{\"Tag\":\"WeaponMeleeDamageMod\",\"Value\":536870912},{\"Tag\":\"WeaponArmorPiercingDamageMod\",\"Value\":536870912},{\"Tag\":\"WeaponImpactDamageMod\",\"Value\":536870912}],\"curses\":[]}"),
        1
    );
    assert(name == "Crita-acri-visi-insiton");
}

{
    const { name } = parseRiven(
        "PlayerMeleeWeaponRandomModRare",
        JSON.parse("{\"compat\":\"/Lotus/Weapons/Tenno/Melee/PlayerMeleeWeapon\",\"lim\":0,\"lvl\":8,\"lvlReq\":0,\"rerolls\":1337,\"pol\":\"AP_ANY\",\"buffs\":[{\"Tag\":\"WeaponCritDamageMod\",\"Value\":1073741823},{\"Tag\":\"WeaponCritDamageMod\",\"Value\":1073741823},{\"Tag\":\"WeaponCritChanceMod\",\"Value\":1073741823},{\"Tag\":\"WeaponCritChanceMod\",\"Value\":536870912},{\"Tag\":\"WeaponSlashDamageMod\",\"Value\":536870912},{\"Tag\":\"WeaponSlashDamageMod\",\"Value\":536870912}],\"curses\":[]}"),
        1
    );
    assert(name == "Crita-acri-acriCritasussus");
}
