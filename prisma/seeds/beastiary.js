const beastiary = [
    {
        name: "amazon",
        hp: 110,
        xp: 60,
        loot: ["brown bread", "crystal necklace", "dagger", "gold coin", "leather armor", "sabre", "skull", "small ruby", "studded shield", "torch"],
        summon: 390,
        convince: 390,
        imageSrc: "/assets/imgs/beastiary/amazon.gif"
    },
    {
        name: "overseer",
        hp: 290,
        xp: 430,
        loot: ["gold coin", "dark armor", "brass legs", "torch", "ham", "strange helmet", "morning star"],
        imageSrc: "/assets/imgs/beastiary/overseer.gif"
    },
    {
        name: "tar",
        hp: 240,
        xp: 260,
        imageSrc: "/assets/imgs/beastiary/tar.gif"
    },
    {
        name: "ancient scarab",
        hp: 1000,
        xp: 720,
        loot: ["ancient amulet", "daramian waraxe", "gold coin", "magic light wand", "plate armor", "scarab amulet", "scarab coin", "small amethyst", "small emerald"],
        imageSrc: "/assets/imgs/beastiary/ancient_scarab.gif"
    },
    {
        name: "badger",
        hp: 23,
        xp: 5,
        loot: ["meat"],
        imageSrc: "/assets/imgs/beastiary/badger.gif"
    },
    {
        name: "banshee",
        hp: 1000,
        xp: 900,
        loot: ["black pearl", "blue robe", "candlestick", "crystal ring", "dirty cape", "gold coin", "life crystal", "lyre", "mirror", "poison dagger", "red robe", "ring of healing", "silver amulet", "silver brooch", "simple dress", "spellbook", "stone skin amulet", "wedding ring", "white pearl"],
        imageSrc: "/assets/imgs/beastiary/banshee.gif"
    },
    {
        name: "bear",
        hp: 80,
        xp: 23,
        loot: ["meat", "ham"],
        imageSrc: "/assets/imgs/beastiary/bear.gif"
    },
    {
        name: "behemoth",
        hp: 4000,
        xp: 2500,
        loot: ["amphora", "big bone", "crowbar", "crystal necklace", "dark armor", "double axe", "giant sword", "gold coin", "meat", "pick", "plate armor", "small amethyst", "steel boots", "strange symbol", "two handed sword", "green spell wand"],
        imageSrc: "/assets/imgs/beastiary/behemoth.gif"
    },
    {
        name: "beholder",
        hp: 170,
        xp: 260,
        loot: ["beholder shield", "gold coin", "longsword", "morning star", "spellbook", "steel shield", "two handed sword", "wooden shield"],
        imageSrc: "/assets/imgs/beastiary/beholder.gif"
    },
    {
        name: "black knight",
        hp: 1800,
        xp: 1600,
        loot: ["battle hammer", "boots of haste", "brass legs", "brown bread", "dark armor", "dragon lance", "gold coin", "halberd", "knight armor", "knight legs", "knight axe", "plate armor", "rope", "ruby necklace", "spear", "steel helmet", "two handed sword", "warrior helmet"],
        imageSrc: "/assets/imgs/beastiary/black_knight.gif"
    },
    {
        name: "black sheep",
        hp: 20,
        loot: ["meat"],
        imageSrc: "/assets/imgs/beastiary/black_sheep.gif"
    },
    {
        name: "blue djinn",
        hp: 330,
        xp: 190,
        loot: ["blue rose", "book", "carrot", "gold coin", "mystic turban", "small oil lamp", "small sapphire"],
        imageSrc: "/assets/imgs/beastiary/blue_djinn.gif"
    },
    {
        name: "bonebeast",
        hp: 515,
        xp: 580,
        loot: ["big bone", "bone", "bone club", "bone shield", "gold coin", "green mushroom", "plate armor", "skull"],
        imageSrc: "/assets/imgs/beastiary/bonebeast.gif"
    },
    {
        name: "bug",
        hp: 29,
        xp: 18,
        loot: ["cherry", "gold coin"],
        imageSrc: "/assets/imgs/beastiary/bug.gif"
    },
    {
        name: "cave rat",
        hp: 30,
        xp: 10,
        loot: ["cheese", "cookie", "gold coin"],
        imageSrc: "/assets/imgs/beastiary/cave_rat.gif"
    },
    {
        name: "cobra",
        hp: 65,
        xp: 30,
        imageSrc: "/assets/imgs/beastiary/cobra.gif"
    },
    {
        name: "crypt shambler",
        hp: 330,
        xp: 195,
        loot: ["bone", "bone shield", "bone sword", "gold coin", "iron helmet", "rotten meat", "small diamond", "throwing star", "two handed sword"],
        imageSrc: "/assets/imgs/beastiary/crypt_shambler.gif"
    },
    {
        name: "cyclops",
        hp: 260,
        xp: 150,
        loot: ["battle shield", "club ring", "dark helmet", "gold coin", "halberd", "ham", "plate shield", "short sword", "wolf tooth chain"],
        imageSrc: "/assets/imgs/beastiary/cyclops.gif"
    },
    {
        name: "deer",
        hp: 25,
        loot: ["meat", "ham"],
        imageSrc: "/assets/imgs/beastiary/deer.gif"
    },
    {
        name: "demon",
        hp: 8200,
        xp: 6000,
        loot: ["demon shield", "devil helmet", "double axe", "fire axe", "fire mushroom", "giant sword", "gold coin", "coconut", "gold ring", "golden legs", "golden sickle", "ice rapier", "magic plate armor", "mastermind shield", "might ring", "orb", "platinum amulet", "purple tome", "ring of healing", "small emerald", "stealth ring", "talon"],
        imageSrc: "/assets/imgs/beastiary/demon.gif"
    },
    {
        name: "demon skeleton",
        hp: 400,
        xp: 240,
        loot: ["battle hammer", "battle shield", "gold coin", "guardian shield", "iron helmet", "mind stone", "mysterious fetish", "throwing star", "torch"],
        imageSrc: "/assets/imgs/beastiary/demon_skeleton.gif"
    },
    {
        name: "dog",
        hp: 20,
        imageSrc: "/assets/imgs/beastiary/dog.gif"
    },
    {
        name: "dragon",
        hp: 1000,
        xp: 700,
        loot: ["broadsword", "burst arrow", "crossbow", "double axe", "dragon ham", "dragon hammer", "dragon shield", "gold coin", "life crystal", "longsword", "mace", "plate legs", "serpent sword", "short sword", "small diamond", "steel helmet", "steel shield"],
        imageSrc: "/assets/imgs/beastiary/dragon.gif"
    },
    {
        name: "dragon lord",
        hp: 1900,
        xp: 2100,
        loot: ["book", "dragon ham", "dragon scale mail", "energy ring", "fire sword", "gold coin", "golden mug", "green mushroom", "life crystal", "power bolt", "royal helmet", "small sapphire", "strange helmet", "tower shield"],
        imageSrc: "/assets/imgs/beastiary/dragon_lord.gif"
    },
    {
        name: "dwarf",
        hp: 90,
        xp: 45,
        loot: ["axe", "copper shield", "dwarven ring", "gold coin", "hatchet", "leather legs", "letter", "pick", "studded armor", "white mushroom"],
        imageSrc: "/assets/imgs/beastiary/dwarf.gif"
    },
    {
        name: "dwarf geomancer",
        hp: 380,
        xp: 245,
        loot: ["blank rune", "clerical mace", "dwarven ring", "gold coin", "leather boots", "magic light wand", "pear", "small sapphire", "soldier helmet", "spellbook", "studded legs", "white mushroom"],
        imageSrc: "/assets/imgs/beastiary/dwarf_geomancer.gif"
    },
    {
        name: "dwarf guard",
        hp: 245,
        xp: 170,
        loot: ["axe ring", "battle hammer", "battle shield", "double axe", "gold coin", "leather boots", "scale armor", "small amethyst", "steel helmet", "white mushroom"],
        imageSrc: "/assets/imgs/beastiary/dwarf_guard.gif"
    },
    {
        name: "dwarf soldier",
        hp: 135,
        xp: 70,
        loot: ["axe ring", "battle axe", "bolt", "chain armor", "crossbow", "dwarven shield", "gold coin", "shovel", "soldier helmet", "white mushroom"],
        imageSrc: "/assets/imgs/beastiary/dwarf_soldier.gif"
    },
    {
        name: "efreet",
        hp: 550,
        xp: 300,
        loot: ["gold coin", "green gem", "green tapestry", "heavy machete", "mystic turban", "pear", "small emerald", "small oil lamp"],
        imageSrc: "/assets/imgs/beastiary/efreet.gif"
    },
    {
        name: "elder beholder",
        hp: 500,
        xp: 280,
        loot: ["beholder shield", "gold coin", "longsword", "carlin sword", "spellbook", "steel shield", "two handed sword"],
        imageSrc: "/assets/imgs/beastiary/elder_beholder.gif"
    },
    {
        name: "elf",
        hp: 100,
        xp: 42,
        loot: ["arrow", "brass shield", "leather boots", "longsword", "red apple", "studded armor", "studded helmet"],
        imageSrc: "/assets/imgs/beastiary/elf.gif"
    },
    {
        name: "elf arcanist",
        hp: 220,
        xp: 175,
        loot: ["arrow", "blank rune", "bowl", "bread", "candlestick", "elven amulet", "grave flower", "green tunic", "inkwell", "life crystal", "melon", "sandals", "scroll", "sling herb", "staff", "yellow gem"],
        imageSrc: "/assets/imgs/beastiary/elf_arcanist.gif"
    },

]

module.exports = beastiary