/**
 * A compact emoji list for a picker, with names and a few keywords each, so a search for "party" finds 🎉.
 * Pure data and pure functions: no screen.
 */

export interface EmojiEntry {
  char: string;
  name: string;
  keywords?: string[];
}

export interface EmojiCategory {
  id: string;
  label: string;
  emojis: EmojiEntry[];
}

const e = (char: string, name: string, ...keywords: string[]): EmojiEntry => ({ char, name, keywords: keywords.length ? keywords : undefined });

export const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: 'smileys',
    label: 'Smileys',
    emojis: [
      e('😀', 'grinning face', 'smile', 'happy'), e('😃', 'grinning face with big eyes', 'smile'), e('😄', 'grinning face with smiling eyes', 'smile', 'laugh'),
      e('😁', 'beaming face', 'grin'), e('😆', 'grinning squinting face', 'laugh', 'haha'), e('😅', 'grinning face with sweat', 'phew', 'nervous'),
      e('😂', 'face with tears of joy', 'laugh', 'lol', 'haha'), e('🤣', 'rolling on the floor laughing', 'lol', 'rofl'), e('🥹', 'face holding back tears', 'touched', 'proud'),
      e('😊', 'smiling face with smiling eyes', 'blush', 'happy'), e('😇', 'smiling face with halo', 'angel', 'innocent'), e('🙂', 'slightly smiling face', 'ok'),
      e('😉', 'winking face', 'wink'), e('😍', 'smiling face with heart-eyes', 'love'), e('🥰', 'smiling face with hearts', 'love'),
      e('😘', 'face blowing a kiss', 'kiss'), e('😋', 'face savoring food', 'yum', 'tasty'), e('😛', 'face with tongue', 'playful'),
      e('😜', 'winking face with tongue', 'silly'), e('🤪', 'zany face', 'crazy'), e('🤨', 'face with raised eyebrow', 'skeptic', 'hmm'),
      e('🧐', 'face with monocle', 'inspect'), e('🤓', 'nerd face', 'geek'), e('😎', 'smiling face with sunglasses', 'cool'),
      e('🥳', 'partying face', 'party', 'celebrate'), e('😏', 'smirking face', 'smirk'), e('😒', 'unamused face', 'meh'),
      e('😞', 'disappointed face', 'sad'), e('😔', 'pensive face', 'sad'), e('😟', 'worried face', 'worry'),
      e('😕', 'confused face', 'confused'), e('🙁', 'slightly frowning face', 'sad'), e('😣', 'persevering face', 'struggle'),
      e('😖', 'confounded face', 'frustrated'), e('😫', 'tired face', 'tired'), e('😩', 'weary face', 'weary'),
      e('🥺', 'pleading face', 'please', 'puppy'), e('😢', 'crying face', 'sad', 'tear'), e('😭', 'loudly crying face', 'cry', 'sob'),
      e('😤', 'face with steam from nose', 'angry', 'triumph'), e('😠', 'angry face', 'angry', 'mad'), e('😡', 'pouting face', 'rage'),
      e('🤬', 'face with symbols on mouth', 'swear'), e('😳', 'flushed face', 'embarrassed'), e('🥵', 'hot face', 'hot'),
      e('🥶', 'cold face', 'cold', 'freezing'), e('😱', 'face screaming in fear', 'scream', 'shock'), e('😨', 'fearful face', 'fear'),
      e('😰', 'anxious face with sweat', 'anxious'), e('🤔', 'thinking face', 'think', 'hmm'), e('🤫', 'shushing face', 'quiet', 'secret'),
      e('🤭', 'face with hand over mouth', 'oops', 'giggle'), e('🫡', 'saluting face', 'salute', 'yes sir'), e('🤗', 'smiling face with open hands', 'hug'),
      e('🫠', 'melting face', 'melt'), e('😶', 'face without mouth', 'speechless'), e('😐', 'neutral face', 'neutral'),
      e('🙄', 'face with rolling eyes', 'eyeroll'), e('😬', 'grimacing face', 'awkward'), e('🤥', 'lying face', 'pinocchio'),
      e('😴', 'sleeping face', 'sleep', 'zzz'), e('🤤', 'drooling face', 'drool'), e('😷', 'face with medical mask', 'sick', 'mask'),
      e('🤒', 'face with thermometer', 'sick'), e('🤕', 'face with head-bandage', 'hurt'), e('🤢', 'nauseated face', 'sick', 'gross'),
      e('🤮', 'face vomiting', 'sick'), e('🤧', 'sneezing face', 'sneeze'), e('🥴', 'woozy face', 'dizzy'),
      e('🤯', 'exploding head', 'mind blown'), e('🤠', 'cowboy hat face', 'yeehaw'), e('🥸', 'disguised face', 'incognito'),
      e('🤖', 'robot', 'bot', 'agent', 'ai'), e('👻', 'ghost', 'boo'), e('💀', 'skull', 'dead'),
      e('👽', 'alien', 'ufo'), e('🎃', 'jack-o-lantern', 'pumpkin', 'halloween'), e('😈', 'smiling face with horns', 'devil'),
      e('🤡', 'clown face', 'clown'), e('💩', 'pile of poo', 'poop'), e('😺', 'grinning cat', 'cat'),
    ],
  },
  {
    id: 'people',
    label: 'People',
    emojis: [
      e('👍', 'thumbs up', 'yes', 'ok', 'like', 'approve'), e('👎', 'thumbs down', 'no', 'dislike'), e('👌', 'ok hand', 'okay', 'perfect'),
      e('✌️', 'victory hand', 'peace'), e('🤞', 'crossed fingers', 'luck', 'hope'), e('🤟', 'love-you gesture', 'love'),
      e('🤘', 'sign of the horns', 'rock'), e('🤙', 'call me hand', 'call'), e('👈', 'backhand index pointing left', 'left'),
      e('👉', 'backhand index pointing right', 'right'), e('👆', 'backhand index pointing up', 'up'), e('👇', 'backhand index pointing down', 'down'),
      e('☝️', 'index pointing up', 'one'), e('✋', 'raised hand', 'stop', 'high five'), e('🤚', 'raised back of hand', 'stop'),
      e('🖐️', 'hand with fingers splayed', 'five'), e('🖖', 'vulcan salute', 'spock'), e('👋', 'waving hand', 'hello', 'bye', 'wave'),
      e('🤝', 'handshake', 'deal', 'agree'), e('🙏', 'folded hands', 'please', 'thanks', 'pray'), e('✍️', 'writing hand', 'write'),
      e('👏', 'clapping hands', 'clap', 'applause', 'bravo'), e('🙌', 'raising hands', 'hooray', 'celebrate'), e('🫶', 'heart hands', 'love'),
      e('👐', 'open hands', 'open'), e('🤲', 'palms up together', 'offer'), e('💪', 'flexed biceps', 'strong', 'muscle'),
      e('🧠', 'brain', 'smart', 'think'), e('👀', 'eyes', 'look', 'watching', 'see'), e('👁️', 'eye', 'see'),
      e('👂', 'ear', 'listen', 'hear'), e('👃', 'nose', 'smell'), e('👄', 'mouth', 'lips'),
      e('🫀', 'anatomical heart', 'heart'), e('👶', 'baby', 'child'), e('🧒', 'child', 'kid'),
      e('👦', 'boy', 'kid'), e('👧', 'girl', 'kid'), e('🧑', 'person', 'adult'),
      e('👨', 'man', 'adult'), e('👩', 'woman', 'adult'), e('🧓', 'older person', 'elder'),
      e('👮', 'police officer', 'cop'), e('🕵️', 'detective', 'spy', 'investigate'), e('👷', 'construction worker', 'builder'),
      e('🧑‍💻', 'technologist', 'developer', 'coder', 'programmer'), e('🧑‍🔬', 'scientist', 'lab'), e('🧑‍🎨', 'artist', 'paint'),
      e('🧑‍🚀', 'astronaut', 'space'), e('🦸', 'superhero', 'hero'), e('🧙', 'mage', 'wizard', 'magic'),
      e('🧟', 'zombie', 'undead'), e('🚶', 'person walking', 'walk'), e('🏃', 'person running', 'run'),
      e('💃', 'woman dancing', 'dance'), e('🕺', 'man dancing', 'dance'), e('🧘', 'person in lotus position', 'yoga', 'meditate'),
      e('👫', 'woman and man holding hands', 'couple'), e('👪', 'family', 'family'), e('🗣️', 'speaking head', 'talk', 'speak'),
      e('👤', 'bust in silhouette', 'user', 'person'), e('👥', 'busts in silhouette', 'users', 'people', 'group'),
    ],
  },
  {
    id: 'nature',
    label: 'Nature',
    emojis: [
      e('🐶', 'dog face', 'dog', 'puppy'), e('🐱', 'cat face', 'cat', 'kitten'), e('🐭', 'mouse face', 'mouse'),
      e('🐹', 'hamster', 'hamster'), e('🐰', 'rabbit face', 'bunny'), e('🦊', 'fox', 'fox'),
      e('🐻', 'bear', 'bear'), e('🐼', 'panda', 'panda'), e('🐨', 'koala', 'koala'),
      e('🐯', 'tiger face', 'tiger'), e('🦁', 'lion', 'lion'), e('🐮', 'cow face', 'cow'),
      e('🐷', 'pig face', 'pig'), e('🐸', 'frog', 'frog'), e('🐵', 'monkey face', 'monkey'),
      e('🙈', 'see-no-evil monkey', 'monkey', 'hide'), e('🙉', 'hear-no-evil monkey', 'monkey'), e('🙊', 'speak-no-evil monkey', 'monkey', 'oops'),
      e('🐔', 'chicken', 'chicken'), e('🐧', 'penguin', 'penguin'), e('🐦', 'bird', 'bird'),
      e('🦆', 'duck', 'duck'), e('🦅', 'eagle', 'eagle'), e('🦉', 'owl', 'owl', 'wise'),
      e('🐺', 'wolf', 'wolf'), e('🐴', 'horse face', 'horse'), e('🦄', 'unicorn', 'unicorn', 'magic'),
      e('🐝', 'honeybee', 'bee'), e('🐛', 'bug', 'bug', 'insect'), e('🦋', 'butterfly', 'butterfly'),
      e('🐌', 'snail', 'snail', 'slow'), e('🐢', 'turtle', 'turtle', 'slow'), e('🐍', 'snake', 'snake'),
      e('🐙', 'octopus', 'octopus'), e('🦀', 'crab', 'crab'), e('🐟', 'fish', 'fish'),
      e('🐬', 'dolphin', 'dolphin'), e('🐳', 'spouting whale', 'whale'), e('🦈', 'shark', 'shark'),
      e('🐘', 'elephant', 'elephant'), e('🦒', 'giraffe', 'giraffe'), e('🐉', 'dragon', 'dragon'),
      e('🌵', 'cactus', 'cactus', 'desert'), e('🎄', 'christmas tree', 'christmas', 'xmas'), e('🌲', 'evergreen tree', 'tree', 'pine'),
      e('🌳', 'deciduous tree', 'tree'), e('🌴', 'palm tree', 'palm', 'beach'), e('🌱', 'seedling', 'plant', 'sprout', 'grow'),
      e('🍀', 'four leaf clover', 'luck', 'lucky'), e('🍁', 'maple leaf', 'leaf', 'autumn', 'fall'), e('🍄', 'mushroom', 'mushroom'),
      e('🌸', 'cherry blossom', 'flower', 'spring'), e('🌹', 'rose', 'flower', 'rose'), e('🌻', 'sunflower', 'flower', 'sun'),
      e('🌞', 'sun with face', 'sun', 'sunny'), e('🌙', 'crescent moon', 'moon', 'night'), e('⭐', 'star', 'star'),
      e('🌟', 'glowing star', 'star', 'shine'), e('✨', 'sparkles', 'sparkle', 'magic', 'new', 'shiny'), e('⚡', 'high voltage', 'lightning', 'zap', 'fast', 'power'),
      e('🔥', 'fire', 'fire', 'hot', 'lit'), e('🌈', 'rainbow', 'rainbow', 'pride'), e('☀️', 'sun', 'sun', 'sunny'),
      e('🌧️', 'cloud with rain', 'rain'), e('❄️', 'snowflake', 'snow', 'cold', 'winter'), e('🌊', 'water wave', 'wave', 'ocean', 'sea'),
      e('🍐', 'pear', 'pear', 'peardrive', 'fruit'),
    ],
  },
  {
    id: 'food',
    label: 'Food',
    emojis: [
      e('🍎', 'red apple', 'apple', 'fruit'), e('🍊', 'tangerine', 'orange', 'fruit'), e('🍋', 'lemon', 'lemon', 'sour'),
      e('🍌', 'banana', 'banana'), e('🍉', 'watermelon', 'melon'), e('🍇', 'grapes', 'grape', 'wine'),
      e('🍓', 'strawberry', 'berry'), e('🫐', 'blueberries', 'berry', 'blueberry'), e('🍒', 'cherries', 'cherry'),
      e('🍑', 'peach', 'peach'), e('🥭', 'mango', 'mango'), e('🍍', 'pineapple', 'pineapple'),
      e('🥥', 'coconut', 'coconut'), e('🥝', 'kiwi fruit', 'kiwi'), e('🍅', 'tomato', 'tomato'),
      e('🥑', 'avocado', 'avocado', 'guacamole'), e('🌽', 'ear of corn', 'corn'), e('🥕', 'carrot', 'carrot'),
      e('🧄', 'garlic', 'garlic'), e('🥐', 'croissant', 'croissant', 'bread'), e('🍞', 'bread', 'bread', 'toast'),
      e('🧀', 'cheese wedge', 'cheese'), e('🥚', 'egg', 'egg'), e('🍳', 'cooking', 'egg', 'fry', 'breakfast'),
      e('🥓', 'bacon', 'bacon'), e('🍔', 'hamburger', 'burger'), e('🍟', 'french fries', 'fries'),
      e('🍕', 'pizza', 'pizza'), e('🌭', 'hot dog', 'hotdog'), e('🌮', 'taco', 'taco'),
      e('🌯', 'burrito', 'burrito'), e('🥗', 'green salad', 'salad'), e('🍝', 'spaghetti', 'pasta'),
      e('🍜', 'steaming bowl', 'ramen', 'noodles'), e('🍣', 'sushi', 'sushi'), e('🍱', 'bento box', 'bento'),
      e('🍦', 'soft ice cream', 'ice cream'), e('🍩', 'doughnut', 'donut'), e('🍪', 'cookie', 'cookie'),
      e('🎂', 'birthday cake', 'cake', 'birthday'), e('🍰', 'shortcake', 'cake'), e('🧁', 'cupcake', 'cupcake'),
      e('🍫', 'chocolate bar', 'chocolate'), e('🍿', 'popcorn', 'popcorn', 'movie'), e('☕', 'hot beverage', 'coffee', 'tea'),
      e('🍵', 'teacup without handle', 'tea'), e('🧃', 'beverage box', 'juice'), e('🍺', 'beer mug', 'beer'),
      e('🍻', 'clinking beer mugs', 'cheers', 'beer'), e('🥂', 'clinking glasses', 'cheers', 'champagne', 'toast'), e('🍷', 'wine glass', 'wine'),
      e('🍸', 'cocktail glass', 'cocktail', 'martini'), e('🧊', 'ice', 'ice', 'cold'),
    ],
  },
  {
    id: 'activity',
    label: 'Activity',
    emojis: [
      e('⚽', 'soccer ball', 'football', 'soccer'), e('🏀', 'basketball', 'basketball'), e('🏈', 'american football', 'football'),
      e('⚾', 'baseball', 'baseball'), e('🎾', 'tennis', 'tennis'), e('🏐', 'volleyball', 'volleyball'),
      e('🏓', 'ping pong', 'table tennis'), e('🏸', 'badminton', 'badminton'), e('🥊', 'boxing glove', 'boxing', 'fight'),
      e('⛳', 'flag in hole', 'golf'), e('🏄', 'person surfing', 'surf'), e('🏊', 'person swimming', 'swim'),
      e('🚴', 'person biking', 'bike', 'cycling'), e('🏋️', 'person lifting weights', 'gym', 'workout'), e('🤸', 'person cartwheeling', 'gymnastics'),
      e('⛷️', 'skier', 'ski'), e('🏂', 'snowboarder', 'snowboard'), e('🎿', 'skis', 'ski'),
      e('🏆', 'trophy', 'win', 'winner', 'champion', 'award'), e('🥇', '1st place medal', 'gold', 'first', 'winner'), e('🥈', '2nd place medal', 'silver', 'second'),
      e('🥉', '3rd place medal', 'bronze', 'third'), e('🏅', 'sports medal', 'medal'), e('🎖️', 'military medal', 'medal'),
      e('🎯', 'bullseye', 'target', 'goal', 'dart'), e('🎮', 'video game', 'game', 'controller', 'gaming'), e('🕹️', 'joystick', 'game', 'arcade'),
      e('🎲', 'game die', 'dice', 'random'), e('🧩', 'puzzle piece', 'puzzle'), e('♟️', 'chess pawn', 'chess'),
      e('🎭', 'performing arts', 'theatre', 'drama'), e('🎨', 'artist palette', 'art', 'paint', 'design'), e('🎬', 'clapper board', 'movie', 'film', 'action'),
      e('🎤', 'microphone', 'mic', 'sing', 'podcast'), e('🎧', 'headphone', 'music', 'listen', 'podcast'), e('🎼', 'musical score', 'music'),
      e('🎹', 'musical keyboard', 'piano'), e('🥁', 'drum', 'drums'), e('🎷', 'saxophone', 'sax', 'jazz'),
      e('🎺', 'trumpet', 'trumpet'), e('🎸', 'guitar', 'guitar', 'rock'), e('🎻', 'violin', 'violin'),
      e('🎳', 'bowling', 'bowling'), e('🎪', 'circus tent', 'circus'), e('🎟️', 'admission tickets', 'ticket'),
      e('🎉', 'party popper', 'party', 'celebrate', 'tada', 'congrats', 'hooray'), e('🎊', 'confetti ball', 'party', 'confetti'), e('🎈', 'balloon', 'party', 'birthday'),
      e('🎁', 'wrapped gift', 'gift', 'present'), e('🎀', 'ribbon', 'bow'),
    ],
  },
  {
    id: 'travel',
    label: 'Travel',
    emojis: [
      e('🚗', 'automobile', 'car'), e('🚕', 'taxi', 'taxi', 'cab'), e('🚌', 'bus', 'bus'),
      e('🚎', 'trolleybus', 'tram'), e('🏎️', 'racing car', 'race', 'fast'), e('🚓', 'police car', 'police'),
      e('🚑', 'ambulance', 'ambulance', 'emergency'), e('🚒', 'fire engine', 'fire truck'), e('🚚', 'delivery truck', 'truck', 'delivery'),
      e('🚜', 'tractor', 'tractor', 'farm'), e('🛵', 'motor scooter', 'scooter'), e('🏍️', 'motorcycle', 'motorbike'),
      e('🚲', 'bicycle', 'bike'), e('🛴', 'kick scooter', 'scooter'), e('🚆', 'train', 'train'),
      e('🚇', 'metro', 'subway', 'metro'), e('🚀', 'rocket', 'launch', 'ship', 'fast', 'space'), e('🛸', 'flying saucer', 'ufo'),
      e('✈️', 'airplane', 'plane', 'flight', 'travel'), e('🛫', 'airplane departure', 'takeoff'), e('🚁', 'helicopter', 'helicopter'),
      e('⛵', 'sailboat', 'sail', 'boat'), e('🚢', 'ship', 'ship', 'cruise'), e('⚓', 'anchor', 'anchor'),
      e('🏠', 'house', 'home'), e('🏡', 'house with garden', 'home'), e('🏢', 'office building', 'office', 'work'),
      e('🏥', 'hospital', 'hospital'), e('🏫', 'school', 'school'), e('🏰', 'castle', 'castle'),
      e('🗼', 'tokyo tower', 'tower'), e('🗽', 'statue of liberty', 'new york'), e('🏖️', 'beach with umbrella', 'beach', 'holiday'),
      e('🏔️', 'snow-capped mountain', 'mountain'), e('🌋', 'volcano', 'volcano'), e('🏕️', 'camping', 'camp', 'tent'),
      e('🌍', 'globe showing europe-africa', 'earth', 'world', 'globe'), e('🌎', 'globe showing americas', 'earth', 'world'), e('🗺️', 'world map', 'map'),
      e('🧭', 'compass', 'compass', 'navigate'), e('🚦', 'vertical traffic light', 'traffic'), e('🛑', 'stop sign', 'stop'),
      e('🌅', 'sunrise', 'morning'), e('🌃', 'night with stars', 'night', 'city'), e('🎆', 'fireworks', 'fireworks', 'celebrate'),
    ],
  },
  {
    id: 'objects',
    label: 'Objects',
    emojis: [
      e('⌚', 'watch', 'time', 'watch'), e('📱', 'mobile phone', 'phone', 'iphone'), e('💻', 'laptop', 'computer', 'mac'),
      e('🖥️', 'desktop computer', 'computer', 'monitor'), e('🖨️', 'printer', 'print'), e('⌨️', 'keyboard', 'keyboard', 'type'),
      e('🖱️', 'computer mouse', 'mouse', 'click'), e('💾', 'floppy disk', 'save', 'disk'), e('💿', 'optical disk', 'cd', 'disk'),
      e('📷', 'camera', 'photo', 'picture'), e('📹', 'video camera', 'video', 'record'), e('🎥', 'movie camera', 'film', 'movie'),
      e('📺', 'television', 'tv'), e('📻', 'radio', 'radio'), e('🎙️', 'studio microphone', 'mic', 'podcast', 'record'),
      e('⏰', 'alarm clock', 'alarm', 'time', 'wake'), e('⏳', 'hourglass not done', 'wait', 'time', 'loading'), e('⏱️', 'stopwatch', 'timer'),
      e('🔋', 'battery', 'battery', 'power'), e('🔌', 'electric plug', 'plug', 'power'), e('💡', 'light bulb', 'idea', 'light'),
      e('🔦', 'flashlight', 'torch', 'light'), e('🕯️', 'candle', 'candle'), e('🧯', 'fire extinguisher', 'extinguisher'),
      e('💵', 'dollar banknote', 'money', 'cash', 'dollar'), e('💰', 'money bag', 'money', 'rich'), e('💳', 'credit card', 'card', 'pay'),
      e('🪙', 'coin', 'coin', 'bitcoin', 'money'), e('💎', 'gem stone', 'diamond', 'gem'), e('⚖️', 'balance scale', 'justice', 'law'),
      e('🔧', 'wrench', 'tool', 'fix', 'settings'), e('🔨', 'hammer', 'tool', 'build'), e('🛠️', 'hammer and wrench', 'tools', 'fix', 'build'),
      e('⚙️', 'gear', 'settings', 'cog', 'config'), e('🔩', 'nut and bolt', 'bolt', 'screw'), e('🧲', 'magnet', 'magnet'),
      e('🔫', 'water pistol', 'gun'), e('🧨', 'firecracker', 'dynamite', 'boom'), e('🔪', 'kitchen knife', 'knife'),
      e('🛡️', 'shield', 'shield', 'protect', 'security'), e('🔬', 'microscope', 'science', 'lab'), e('🔭', 'telescope', 'telescope', 'space'),
      e('📡', 'satellite antenna', 'signal', 'antenna'), e('💉', 'syringe', 'vaccine', 'shot'), e('💊', 'pill', 'medicine', 'pill'),
      e('🩹', 'adhesive bandage', 'bandaid', 'patch', 'fix'), e('🚪', 'door', 'door', 'exit'), e('🛏️', 'bed', 'bed', 'sleep'),
      e('🧸', 'teddy bear', 'teddy', 'toy'), e('📦', 'package', 'box', 'package', 'ship', 'deliver'),
      e('📫', 'closed mailbox with raised flag', 'mail', 'inbox'), e('📮', 'postbox', 'mail', 'post'), e('✉️', 'envelope', 'mail', 'email', 'message'),
      e('📩', 'envelope with arrow', 'email', 'send'), e('📝', 'memo', 'note', 'write', 'edit'), e('📄', 'page facing up', 'document', 'file', 'page'),
      e('📃', 'page with curl', 'document', 'page'), e('📑', 'bookmark tabs', 'tabs', 'bookmark'), e('📊', 'bar chart', 'chart', 'stats', 'graph'),
      e('📈', 'chart increasing', 'chart', 'up', 'growth'), e('📉', 'chart decreasing', 'chart', 'down'), e('📋', 'clipboard', 'clipboard', 'copy'),
      e('📌', 'pushpin', 'pin', 'location'), e('📍', 'round pushpin', 'pin', 'here', 'location'), e('📎', 'paperclip', 'attach', 'clip'),
      e('🔗', 'link', 'link', 'url'), e('📏', 'straight ruler', 'ruler', 'measure'), e('✂️', 'scissors', 'cut'),
      e('🗂️', 'card index dividers', 'folders', 'organize'), e('📁', 'file folder', 'folder', 'directory'), e('📂', 'open file folder', 'folder', 'open'),
      e('🗓️', 'spiral calendar', 'calendar', 'date', 'schedule'), e('📅', 'calendar', 'calendar', 'date'), e('🗑️', 'wastebasket', 'trash', 'delete', 'bin'),
      e('🔒', 'locked', 'lock', 'private', 'secure'), e('🔓', 'unlocked', 'unlock', 'open'), e('🔑', 'key', 'key', 'password', 'access'),
      e('🗝️', 'old key', 'key'), e('🔔', 'bell', 'bell', 'notification', 'alert'), e('🔕', 'bell with slash', 'mute', 'silent'),
      e('📣', 'megaphone', 'announce', 'shout'), e('📢', 'loudspeaker', 'announce'), e('🔍', 'magnifying glass tilted left', 'search', 'find', 'zoom'),
      e('📚', 'books', 'books', 'library', 'read', 'wiki'), e('📖', 'open book', 'book', 'read'),
      e('🧪', 'test tube', 'test', 'experiment', 'lab'), e('🧬', 'dna', 'dna', 'gene'), e('🧹', 'broom', 'clean', 'sweep'),
    ],
  },
  {
    id: 'symbols',
    label: 'Symbols',
    emojis: [
      e('❤️', 'red heart', 'love', 'heart'), e('🧡', 'orange heart', 'love', 'heart'), e('💛', 'yellow heart', 'love', 'heart'),
      e('💚', 'green heart', 'love', 'heart', 'pear'), e('💙', 'blue heart', 'love', 'heart'), e('💜', 'purple heart', 'love', 'heart'),
      e('🖤', 'black heart', 'heart'), e('🤍', 'white heart', 'heart'), e('💔', 'broken heart', 'heartbreak', 'sad'),
      e('💕', 'two hearts', 'love'), e('💖', 'sparkling heart', 'love'), e('💘', 'heart with arrow', 'love', 'cupid'),
      e('💯', 'hundred points', '100', 'perfect', 'score'), e('💢', 'anger symbol', 'angry'), e('💥', 'collision', 'boom', 'bang', 'explosion'),
      e('💫', 'dizzy', 'dizzy', 'star'), e('💦', 'sweat droplets', 'sweat', 'water'), e('💨', 'dashing away', 'wind', 'fast', 'gone'),
      e('🕳️', 'hole', 'hole'), e('💬', 'speech balloon', 'chat', 'message', 'comment', 'talk'), e('💭', 'thought balloon', 'think', 'thought'),
      e('🗨️', 'left speech bubble', 'chat', 'speech'), e('💤', 'zzz', 'sleep', 'tired', 'zzz'), e('✅', 'check mark button', 'done', 'yes', 'check', 'ok', 'approved'),
      e('☑️', 'check box with check', 'done', 'check'), e('✔️', 'check mark', 'done', 'yes', 'check'), e('❌', 'cross mark', 'no', 'wrong', 'x', 'cancel'),
      e('❎', 'cross mark button', 'no', 'x'), e('➕', 'plus', 'plus', 'add', 'more'), e('➖', 'minus', 'minus', 'remove'),
      e('➗', 'divide', 'divide'), e('✖️', 'multiply', 'times', 'x'), e('♾️', 'infinity', 'infinite', 'forever'),
      e('❓', 'red question mark', 'question', 'what', 'help'), e('❔', 'white question mark', 'question'), e('❗', 'red exclamation mark', 'exclamation', 'important', 'alert'),
      e('❕', 'white exclamation mark', 'exclamation'), e('‼️', 'double exclamation mark', 'wow', 'important'), e('⁉️', 'exclamation question mark', 'what'),
      e('⚠️', 'warning', 'warning', 'caution', 'alert'), e('🚫', 'prohibited', 'no', 'forbidden', 'banned'), e('🔞', 'no one under eighteen', '18'),
      e('♻️', 'recycling symbol', 'recycle', 'green'), e('⚜️', 'fleur-de-lis', 'fleur'), e('🔱', 'trident emblem', 'trident'),
      e('📛', 'name badge', 'name', 'badge'), e('🔰', 'japanese symbol for beginner', 'beginner', 'new'), e('⭕', 'hollow red circle', 'circle', 'o'),
      e('🔴', 'red circle', 'red', 'record', 'live'), e('🟠', 'orange circle', 'orange'), e('🟡', 'yellow circle', 'yellow'),
      e('🟢', 'green circle', 'green', 'online', 'go'), e('🔵', 'blue circle', 'blue'), e('🟣', 'purple circle', 'purple'),
      e('⚫', 'black circle', 'black'), e('⚪', 'white circle', 'white'), e('🟩', 'green square', 'green'),
      e('🟥', 'red square', 'red'), e('🔶', 'large orange diamond', 'diamond'), e('🔷', 'large blue diamond', 'diamond'),
      e('▶️', 'play button', 'play', 'start'), e('⏸️', 'pause button', 'pause'), e('⏹️', 'stop button', 'stop'),
      e('⏺️', 'record button', 'record'), e('⏭️', 'next track button', 'next', 'skip'), e('⏮️', 'last track button', 'previous', 'back'),
      e('🔀', 'shuffle tracks button', 'shuffle', 'random'), e('🔁', 'repeat button', 'repeat', 'loop'), e('🔄', 'counterclockwise arrows button', 'refresh', 'sync', 'reload'),
      e('⬆️', 'up arrow', 'up'), e('⬇️', 'down arrow', 'down'), e('⬅️', 'left arrow', 'left', 'back'),
      e('➡️', 'right arrow', 'right', 'next', 'forward'), e('↩️', 'right arrow curving left', 'reply', 'return', 'back'), e('↪️', 'left arrow curving right', 'forward'),
      e('🔝', 'top arrow', 'top'), e('🆕', 'new button', 'new'), e('🆗', 'ok button', 'ok'),
      e('🆒', 'cool button', 'cool'), e('🆓', 'free button', 'free'), e('🔤', 'input latin letters', 'abc', 'letters'),
      e('🔢', 'input numbers', '123', 'numbers'), e('#️⃣', 'keycap number sign', 'hash', 'hashtag', 'pound'), e('*️⃣', 'keycap asterisk', 'star', 'asterisk'),
      e('0️⃣', 'keycap 0', 'zero', '0'), e('1️⃣', 'keycap 1', 'one', '1'), e('2️⃣', 'keycap 2', 'two', '2'),
      e('3️⃣', 'keycap 3', 'three', '3'), e('🔟', 'keycap 10', 'ten', '10'), e('©️', 'copyright', 'copyright'),
      e('™️', 'trade mark', 'trademark', 'tm'), e('🏁', 'chequered flag', 'finish', 'done', 'race'), e('🚩', 'triangular flag', 'flag', 'red flag', 'warning'),
      e('🏳️', 'white flag', 'surrender', 'flag'), e('🏴‍☠️', 'pirate flag', 'pirate'), e('🏳️‍🌈', 'rainbow flag', 'pride'),
    ],
  },
];

/** The six offered before anyone has used any. */
export const DEFAULT_QUICK_EMOJI = ['👍', '❤️', '😂', '🎉', '🤔', '👀'];

const normalize = (s: string) => s.toLowerCase().trim();

/**
 * The emoji whose name or keywords contain every word of `query`, names first, then keywords, each once, in
 * category order. An empty query finds nothing: show the categories instead.
 */
export function searchEmoji(query: string, categories: readonly EmojiCategory[] = EMOJI_CATEGORIES, limit = 64): string[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const byName: string[] = [];
  const byKeyword: string[] = [];
  const seen = new Set<string>();
  for (const c of categories) {
    for (const em of c.emojis) {
      if (seen.has(em.char)) continue;
      const name = normalize(em.name);
      const keys = (em.keywords ?? []).map(normalize);
      if (words.every((w) => name.includes(w))) {
        seen.add(em.char);
        byName.push(em.char);
      } else if (words.every((w) => name.includes(w) || keys.some((k) => k.includes(w)))) {
        seen.add(em.char);
        byKeyword.push(em.char);
      }
    }
  }
  return [...byName, ...byKeyword].slice(0, limit);
}

/** The entry for an emoji, or undefined. */
export function emojiEntry(char: string, categories: readonly EmojiCategory[] = EMOJI_CATEGORIES): EmojiEntry | undefined {
  for (const c of categories) for (const em of c.emojis) if (em.char === char) return em;
  return undefined;
}

/** `recent` with `char` moved to the front, at most `max` long. For the host to keep. */
export function pushRecent(recent: readonly string[], char: string, max = 24): string[] {
  return [char, ...recent.filter((r) => r !== char)].slice(0, max);
}
