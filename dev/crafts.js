Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({id: BlockID["iMod_radio"], count: 1, data: 0}, [
        "ppa",
        "scs",
        "pwp"
    ], ['p', ItemID.iMod_plate, 0, 'a', ItemID.iMod_antenna, 0, 's', ItemID.iMod_speaker, 0, 'c', ItemID.iMod_coil, 0, 'w', ItemID.iMod_wire, 0]);

    Recipes.addShaped({id: ItemID["iMod_clock2"], count: 1, data: 0}, [
        " g ",
        "gsg",
        " g "
    ], ['g', 266, 0, 's', 160, -1]);
});