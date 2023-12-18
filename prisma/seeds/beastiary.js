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
    {
        name: "elf scout",
        hp: 160,
        xp: 75,
        loot: ["arrow", "bow", "gold coin", "grapes", "longsword", "poison arrow", "sandals", "studded armor", "studded helmet", "waterskin"],
        imageSrc: "/assets/imgs/beastiary/elf_scout.gif"
    },
    {
        name: "fire devil",
        hp: 200,
        xp: 110,
        loot: ["blank rune", "cleaver", "double axe", "guardian shield", "pitchfork", "scimitar", "small amethyst", "torch", "red spell wand"],
        imageSrc: "/assets/imgs/beastiary/fire_devil.gif"
    },
    {
        name: "fire elemental",
        hp: 280,
        xp: 220,
        imageSrc: "/assets/imgs/beastiary/fire_elemental.gif"
    },
    {
        name: "frost troll",
        hp: 55,
        xp: 23,
        loot: ["club", "coat", "fish", "gold coin", "rapier", "spear", "twigs", "wooden shield"],
        imageSrc: "/assets/imgs/beastiary/frost_troll.gif"
    },
    {
        name: "gargoyle",
        hp: 250,
        xp: 150,
        loot: ["battle shield", "club ring", "dark armor", "gold coin", "ham", "meat", "morning star", "small stone", "steel helmet", "studded club", "wolf tooth chain"],
        imageSrc: "/assets/imgs/beastiary/gargoyle.gif"
    },
    {
        name: "gazer",
        hp: 120,
        xp: 90,
        loot: ["gold coin", "wooden shield"],
        imageSrc: "/assets/imgs/beastiary/gazer.gif"
    },
    {
        name: "ghost",
        hp: 150,
        xp: 120,
        loot: ["ancient shield", "book", "cape", "combat knife", "morning star", "sandals", "shadow herb", "stealth ring", "golden wand"],
        imageSrc: "/assets/imgs/beastiary/ghost.gif"
    },
    {
        name: "ghoul",
        hp: 100,
        xp: 85,
        loot: ["brass helmet", "gold coin", "knife", "life ring", "scale armor", "skull", "torch", "viking helmet"],
        imageSrc: "/assets/imgs/beastiary/bear.gif"
    },
    {
        name: "giant spider",
        hp: 1300,
        xp: 900,
        loot: ["brass legs", "gold coin", "knight armor", "knight legs", "plate armor", "platinum amulet", "steel helmet", "time ring"],
        imageSrc: "/assets/imgs/beastiary/giant_spider.gif"
    },
    {
        name: "goblin",
        hp: 50,
        xp: 25,
        loot: ["bone", "bone club", "dagger", "fish", "gold coin", "leather armor", "leather helmet", "moldy cheese", "short sword", "small axe", "small stone"],
        imageSrc: "/assets/imgs/beastiary/goblin.gif"
    },
    {
        name: "green djinn",
        hp: 330,
        xp: 190,
        loot: ["book", "cheese", "gold coin", "grave flower", "mystic turban", "small emerald", "small oil lamp"],
        imageSrc: "/assets/imgs/beastiary/green_djinn.gif"
    },
    {
        name: "hero",
        hp: 1400,
        xp: 1200,
        loot: ["arrow", "bow", "crown armor", "crown helmet", "crown legs", "crown shield", "fire sword", "gold coin", "grapes", "green tunic", "lyre", "meat", "might ring", "red rose", "rope", "scarf", "scroll", "two handed sword", "war hammer", "wedding ring"],
        imageSrc: "/assets/imgs/beastiary/hero.gif"
    },
    {
        name: "hunter",
        hp: 150,
        xp: 150,
        loot: ["arrow", "bow", "brass armor", "brass helmet", "burst arrow", "dragon necklace", "leather helmet", "leather legs", "orange", "roll", "small ruby", "torch"],
        imageSrc: "/assets/imgs/beastiary/hunter.gif"
    },
    {
        name: "hyaena",
        hp: 60,
        xp: 20,
        loot: ["meat"],
        imageSrc: "/assets/imgs/beastiary/hyaena.gif"
    },
    {
        name: "larva",
        hp: 70,
        xp: 44,
        loot: ["gold coin", "meat"],
        imageSrc: "/assets/imgs/beastiary/larva.gif"
    },
    {
        name: "lich",
        hp: 880,
        xp: 900,
        loot: ["black pearl", "blue robe", "castle shield", "dirty cape", "gold coin", "mind stone", "platinum amulet", "ring of healing", "spellbook", "staff", "strange helmet", "white pearl"],
        imageSrc: "/assets/imgs/beastiary/lich.gif"
    },
    {
        name: "lion",
        hp: 80,
        xp: 30,
        loot: ["meat", "ham"],
        imageSrc: "/assets/imgs/beastiary/lion.gif"
    },
    {
        name: "marid",
        hp: 550,
        xp: 300,
        loot: ["blue gem", "blue tapestry", "blueberry", "gold coin", "heavy machete", "mystic turban", "small oil lamp", "small sapphire", "wooden flute"],
        imageSrc: "/assets/imgs/beastiary/marid.gif"
    },
    {
        name: "minotaur",
        hp: 100,
        xp: 50,
        loot: ["axe", "brass helmet", "bronze amulet", "chain armor", "chain helmet", "gold coin", "leather legs", "mace", "meat", "plate shield", "shovel", "sword"],
        imageSrc: "/assets/imgs/beastiary/minotaur.gif"
    },
    {
        name: "minotaur archer",
        hp: 100,
        xp: 65,
        loot: ["bolt", "brass armor", "crossbow", "gold coin", "leather helmet", "leather legs", "meat", "scale armor", "soldier helmet"],
        imageSrc: "/assets/imgs/beastiary/minotaur_archer.gif"
    },
    {
        name: "minotaur guard",
        hp: 185,
        xp: 160,
        loot: ["battle shield", "brass armor", "chain armor", "chain legs", "double axe", "fishing rod", "gold coin", "hatchet", "leather legs", "meat"],
        imageSrc: "/assets/imgs/beastiary/minotaur_guard.gif"
    },
    {
        name: "minotaur mage",
        hp: 155,
        xp: 150,
        loot: ["brass armor", "carrot", "chain legs", "combat knife", "dead snake", "gold coin", "knife", "leather helmet", "leather legs", "torch"],
        imageSrc: "/assets/imgs/beastiary/minotaur_mage.gif"
    },
    {
        name: "monk",
        hp: 240,
        xp: 200,
        loot: ["ankh", "bread", "brown flask", "gold coin", "leather armor", "life crystal", "lamp", "power ring", "sandals", "scroll", "staff"],
        imageSrc: "/assets/imgs/beastiary/monk.gif"
    },
    {
        name: "mummy",
        hp: 240,
        xp: 150,
        loot: ["black pearl", "black shield", "crystal ring", "gold coin", "magic light wand", "poison dagger", "short sword", "silver amulet", "silver brooch", "strange talisman"],
        imageSrc: "/assets/imgs/beastiary/mummy.gif"
    },
    {
        name: "necromancer",
        hp: 580,
        xp: 580,
        loot: ["boots of haste", "clerical mace", "gold coin", "green mushroom", "mystic turban", "scale armor", "short sword", "skull staff", "conjurer wand"],
        imageSrc: "/assets/imgs/beastiary/necromancer.gif"
    },
    {
        name: "orc",
        hp: 70,
        xp: 25,
        loot: ["axe", "gold coin", "meat", "studded armor", "studded helmet", "studded shield"],
        imageSrc: "/assets/imgs/beastiary/orc.gif"
    },
    {
        name: "orc berserker",
        hp: 210,
        xp: 195,
        loot: ["battle axe", "chain armor", "chain helmet", "gold coin", "halberd", "ham", "lamp"],
        imageSrc: "/assets/imgs/beastiary/orc_berserker.gif"
    },
    {
        name: "orc leader",
        hp: 450,
        xp: 270,
        loot: ["backpack", "brass legs", "broadsword", "dagger", "fish", "gold coin", "longsword", "meat", "plate armor", "plate legs", "plate shield", "scimitar", "sword ring", "throwing knife", "warrior helmet"],
        imageSrc: "/assets/imgs/beastiary/orc_leader.gif"
    },
    {
        name: "orc rider",
        hp: 180,
        xp: 110,
        loot: ["backpack", "battle shield", "gold coin", "meat", "obsidian lance", "orcish axe", "scale armor", "studded helmet", "torch", "wolf tooth chain"],
        imageSrc: "/assets/imgs/beastiary/orc_rider.gif"
    },
    {
        name: "orc shaman",
        hp: 115,
        xp: 110,
        loot: ["book", "chain armor", "chain helmet", "corncob", "gold coin", "spear", "staff", "blue spell wand"],
        imageSrc: "/assets/imgs/beastiary/orc_shaman.gif"
    },
    {
        name: "orc spearman",
        hp: 105,
        xp: 38,
        loot: ["dirty fur", "gold coin", "machete", "meat", "spear", "studded helmet", "studded legs"],
        imageSrc: "/assets/imgs/beastiary/orc_spearman.gif"
    },
    {
        name: "orc warlord",
        hp: 950,
        xp: 670,
        loot: ["brass armor", "brass legs", "crusader helmet", "dark helmet", "dragon hammer", "fish", "gold coin", "meat", "orcish axe", "plate armor", "plate legs", "protection amulet", "scimitar", "stealth ring", "throwing star", "two handed sword"],
        imageSrc: "/assets/imgs/beastiary/orc_warlord.gif"
    },
    {
        name: "orc warrior",
        hp: 125,
        xp: 50,
        loot: ["bottle", "chain armor", "copper shield", "gold coin", "meat", "poison dagger", "sabre", "wooden shield"],
        imageSrc: "/assets/imgs/beastiary/orc_warrior.gif"
    },
    {
        name: "pig",
        hp: 25,
        loot: ["meat"],
        imageSrc: "/assets/imgs/beastiary/pig.gif"
    },
    {
        name: "poison spider",
        hp: 26,
        xp: 22,
        loot: ["gold coin"],
        imageSrc: "/assets/imgs/beastiary/poison_spider.gif"
    },
    {
        name: "polar bear",
        hp: 85,
        xp: 28,
        loot: ["meat", "ham"],
        imageSrc: "/assets/imgs/beastiary/polar_bear.gif"
    },
    {
        name: "priestess",
        hp: 390,
        xp: 420,
        loot: ["black shield", "book", "bowl", "clerical mace", "crystal ball", "crystal necklace", "dagger", "goat grass", "powder herb", "red apple", "sling herb", "talon", "wood mushroom", "wooden flute"],
        imageSrc: "/assets/imgs/beastiary/hyaena.gif"
    },
    {
        name: "rabbit",
        hp: 15,
        loot: ["carrot", "meat"],
        imageSrc: "/assets/imgs/beastiary/rabbit.gif"
    },
    {
        name: "rat",
        hp: 20,
        xp: 5,
        loot: ["cheese", "gold coin"],
        imageSrc: "/assets/imgs/beastiary/rat.gif"
    },
    {
        name: "rotworm",
        hp: 65,
        xp: 40,
        loot: ["copper shield", "gold coin", "ham", "katana", "legion helmet", "mace", "meat", "sword"],
        imageSrc: "/assets/imgs/beastiary/rotworm.gif"
    },
    {
        name: "scarab",
        hp: 320,
        xp: 120,
        loot: ["arrow", "daramian mace", "gold coin", "heavy machete", "meat", "scarab coin", "small amethyst", "small emerald"],
        imageSrc: "/assets/imgs/beastiary/scarab.gif"
    },
    {
        name: "scorpion",
        hp: 45,
        xp: 45,
        imageSrc: "/assets/imgs/beastiary/scorpion.gif"
    },
    {
        name: "sheep",
        hp: 20,
        loot: ["meat"],
        imageSrc: "/assets/imgs/beastiary/sheep.gif"
    },
    {
        name: "skeleton",
        hp: 50,
        xp: 35,
        loot: ["bone", "brass shield", "gold coin", "hatchet", "mace", "sword", "torch", "viking helmet"],
        imageSrc: "/assets/imgs/beastiary/skeleton.gif"
    },
    {
        name: "skunk",
        hp: 20,
        xp: 3,
        loot: ["meat"],
        imageSrc: "/assets/imgs/beastiary/skunk.gif"
    },
    {
        name: "slime",
        hp: 150,
        xp: 160,
        imageSrc: "/assets/imgs/beastiary/slime.gif"
    },
    {
        name: "snake",
        hp: 15,
        xp: 10,
        imageSrc: "/assets/imgs/beastiary/snake.gif"
    },
    {
        name: "stalker",
        hp: 120,
        xp: 90,
        loot: ["backpack", "blank rune", "brass legs", "brass shield", "gold coin", "katana", "leather legs", "obsidian lance", "throwing knife"],
        imageSrc: "/assets/imgs/beastiary/stalker.gif"
    },
    {
        name: "stone golem",
        hp: 270,
        xp: 160,
        loot: ["carlin sword", "crystal ring", "gold coin", "power ring", "red gem", "scale armor", "small stone", "steel shield", "torch"],
        imageSrc: "/assets/imgs/beastiary/hyaena.gif"
    },
    {
        name: "swamp troll",
        hp: 55,
        xp: 25,
        loot: ["dagger", "fish", "fishing rod", "gold coin", "leather boots", "torch"],
        imageSrc: "/assets/imgs/beastiary/swamp_troll.gif"
    },
    {
        name: "troll",
        hp: 50,
        xp: 20,
        loot: ["gold coin", "hand axe", "leather boots", "leather helmet", "meat", "rope", "silver amulet", "spear", "studded club", "wooden shield"],
        imageSrc: "/assets/imgs/beastiary/troll.gif"
    },
    {
        name: "valkyrie",
        hp: 190,
        xp: 85,
        loot: ["chain armor", "chain helmet", "dagger", "double axe", "gold coin", "meat", "plate armor", "protection amulet", "red apple", "skull", "small diamond", "spear"],
        imageSrc: "/assets/imgs/beastiary/valkyrie.gif"
    },
    {
        name: "vampire",
        hp: 450,
        xp: 290,
        loot: ["black pearl", "bowl", "bronze amulet", "emerald bangle", "gold coin", "grave flower", "ice rapier", "katana", "leather legs", "skull", "spike sword", "strange helmet", "vampire shield"],
        imageSrc: "/assets/imgs/beastiary/vampire.gif"
    },
    {
        name: "war wolf",
        hp: 140,
        xp: 55,
        loot: ["meat", "ham"],
        imageSrc: "/assets/imgs/beastiary/war_wolf.gif"
    },
    {
        name: "warlock",
        hp: 4000,
        xp: 3200,
        loot: ["blue robe", "bread", "candlestick", "cherry", "crystal ring", "dark mushroom", "energy ring", "gold coin", "golden armor", "inkwell", "mind stone", "poison dagger", "red tome", "ring of the sky", "skull staff", "small sapphire", "stone skin amulet", "talon", "wand of might"],
        imageSrc: "/assets/imgs/beastiary/warlock.gif"
    },
    {
        name: "wasp",
        hp: 35,
        xp: 24,
        imageSrc: "/assets/imgs/beastiary/wasp.gif"
    },
    {
        name: "wild warrior",
        hp: 120,
        xp: 55,
        loot: ["axe", "brass armor", "brass shield", "leather boots", "doll", "gold coin", "iron helmet", "leather legs", "mace", "meat", "steel shield", "war hammer"],
        imageSrc: "/assets/imgs/beastiary/wild_warrior.gif"
    },
    {
        name: "winter wolf",
        hp: 30,
        xp: 20,
        loot: ["meat"],
        imageSrc: "/assets/imgs/beastiary/winter_wolf.gif"
    },
    {
        name: "witch",
        hp: 300,
        xp: 120,
        loot: ["broom", "cape", "cheese", "coat", "cookie", "garlic necklace", "gold coin", "leather boots", "sickle", "silver dagger", "star herb", "wolf tooth chain"],
        imageSrc: "/assets/imgs/beastiary/witch.gif"
    },
    {
        name: "wolf",
        hp: 25,
        xp: 18,
        loot: ["meat"],
        imageSrc: "/assets/imgs/beastiary/wolf.gif"
    },
    {
        name: "yeti",
        hp: 950,
        xp: 460,
        loot: ["bunnyslippers", "gold coin", "ham", "meat", "snowball", "wolf tooth chain"],
        imageSrc: "/assets/imgs/beastiary/yeti.gif"
    },
    {
        name: "alphadyte",
        hp: 750,
        xp: 480,
        loot: ["big bone", "battle shield", "plate armor", "meat", "gold coin", "small diamond", "skull"],
        imageSrc: "/assets/imgs/beastiary/alphadyte.gif"
    },
    {
        name: "desert hunter",
        hp: 25,
        xp: 230,
        loot: ["gold coin", "leather helmet", "arrow", "power arrow", "meat", "burst arrow", "bow", "brass armor", "leather legs", "poison arrow", "foil"],
        imageSrc: "/assets/imgs/beastiary/desert_hunter.gif"
    },
    {
        name: "gorlak",
        hp: 80,
        xp: 40,
        loot: ["brown mushroom", "gold coin", "studded club"],
        imageSrc: "/assets/imgs/beastiary/gorlak.gif"
    },
    {
        name: "kobold",
        hp: 120,
        xp: 60,
        loot: ["gold coin", "meat", "spear", "wooden shield", "studded armor"],
        imageSrc: "/assets/imgs/beastiary/kobold.gif"
    },
    {
        name: "kobold stoneshooter",
        hp: 150,
        xp: 100,
        loot: ["gold coin", "stone", "brass armor", "meat", "brass legs", "brass helmet", "rapier"],
        imageSrc: "/assets/imgs/beastiary/kobold_stoneshooter.gif"
    },
    {
        name: "magma beast",
        hp: 5500,
        xp: 3300,
        loot: ["gold coin", "talon", "burst arrow", "strange helmet", "dark armor", "broadsword", "obsidian lance", "small ruby", "stone skin amulet", "might ring", "red gem", "hammer of wrath"],
        imageSrc: "/assets/imgs/beastiary/magma_beast.gif"
    },
    {
        name: "obliterator?",
        imageSrc: "/assets/imgs/beastiary/obliterator.gif"
    },
    {
        name: "sandlord",
        hp: 25,
        xp: 4800,
        loot: ["red robe", "bright sword"],
        imageSrc: "/assets/imgs/beastiary/sandlord.gif"
    },
    {
        name: "troglodyte",
        hp: 220,
        xp: 380,
        loot: ["fish", "spear", "bone", "gold coin", "bone shield", "remains of a fish", "scale armor", "mace", "brass legs", "rotten meat"],
        imageSrc: "/assets/imgs/beastiary/troglodyte.gif"
    },
    {
        name: "underworm",
        hp: 25,
        xp: 1700,
        loot: ["brass legs", "iron helmet", "gold coin", "meat", "battle hammer", "ham", "two handed sword", "brass armor", "skull", "skeleton", "big bone", "dark shield", "axe ring"],
        imageSrc: "/assets/imgs/beastiary/underworm.gif"
    },
]

module.exports = beastiary