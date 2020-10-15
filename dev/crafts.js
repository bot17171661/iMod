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

    Recipes.addShaped({id: ItemID["iMod_compass"], count: 1, data: 0}, [
        "rir",
        "igi",
        "rir"
    ], ['i', 265, 0, 'g', 160, -1, 'r', 331, 0]);

    Recipes.addShaped({id: ItemID["iMod_coil"], count: 1, data: 0}, [
        "www",
        "wiw",
        "www"
    ], ['i', 265, 0, 'w', ItemID.iMod_wire, 0]);
    
    Recipes.addShaped({id: ItemID["iMod_wire"], count: 1, data: 0}, [
        " s ",
        " i ",
        " s "
    ], ['i', 265, 0, 's', 341, 0]);

    Recipes.addShaped({id: ItemID["iMod_plate"], count: 1, data: 0}, [
        " i ",
        "iii",
        " i "
    ], ['i', 265, 0]);

    Recipes.addShaped({id: ItemID["iMod_speaker"], count: 1, data: 0}, [
        "rir",
        "iii",
        "rir"
    ], ['i', 265, 0, 'r', 331, 0]);

    Recipes.addShaped({id: ItemID["iMod_antenna"], count: 1, data: 0}, [
        "rir",
        " i ",
        " i "
    ], ['i', 265, 0, 'r', 331, 0]);

    Recipes.addShaped({id: BlockID["iMod_radio_tower"], count: 1, data: 0}, [
        "rir",
        "iii",
        "rir"
    ], ['i', 265, 0, 'r', 331, 0]);

    Recipes.addShaped({id: BlockID["iMod_carpet"], count: 1, data: 0}, [
        "ccc",
        "ccc",
        "ccc"
    ], ['c', 171, -1]);
});