/*
 * @Author: huangwensong
 * @Date: 2024-03-25 19:17:48
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-25 19:24:58
 * @FilePath: /final-phrase-demo/src/store/palyInfo.ts
 * @Description:
 */
import { ref, reactive } from 'vue';
const state = reactive({
    title: '《魔法遗迹》',
    content: [
        {
            sessionId: 1,
            sessionTitle: '场次1',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>（舞台背景中是一片神秘的古老森林，树木参天，阳光透过树叶洒下，笼罩着一片神秘的氛围。在森林的深处，是一个古老的遗迹，被藤蔓和树木覆盖，只露出一丝神秘的光芒。）</p><p>（主角艾莉亚，一名年轻而勇敢的女骑士，手持一把闪闪发光的长剑，穿越森林，来到了这个神秘的遗迹前。）</p><p><br></p><p>	艾莉亚：（激动）终于找到了，传说中的魔法遗迹！这里隐藏着古老的力量，我必须探寻其中的秘密！</p><p><br></p><p>（艾莉亚走近遗迹，突然，一阵神秘的光芒将她包围，遗迹开始散发出古老的魔法能量。）</p><p>（突然，一个黑暗的影子从遗迹中浮现出来，是一个邪恶的巫师，名叫玛洛斯。）</p><p><br></p><p>	玛洛斯：（阴冷地笑）你是谁，竟敢闯入我的领域？</p><p>	艾莉亚：我是艾莉亚，来自阿瓦隆的女骑士。我来寻找古老的魔法力量，为正义而战！</p><p>	玛洛斯：（嘲讽地笑）正义？愚蠢的女孩，你根本不知道你在与何物对抗！这里的力量只适合真正的统治者，而那就是我！</p><p><br></p><p>（玛洛斯释放出黑暗的魔法，与艾莉亚展开了激烈的战斗。）</p><p>（战斗中，艾莉亚不断使用她的剑术和勇气，与玛洛斯抗衡。）</p><p>（最终，艾莉亚利用自己的坚持和勇气，成功击败了玛洛斯，将他封印在遗迹中。）</p><p><br></p><p>	艾莉亚：（呼吸急促，但满怀胜利的喜悦）邪恶永远无法战胜正义！我将保护这份古老的力量，直到世界再次需要它！</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div>'
        },
        {
            sessionId: 2,
            sessionTitle: '场次2',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>（舞台背景转移到阿瓦隆王国，一个充满活力和繁荣的国家，人们在街上欢呼庆祝胜利。）</p><p>（艾莉亚受到了人们的敬佩和赞扬，她站在城堡的高台上，面向人群，挥舞着手中的长剑。）</p><p>艾莉亚：（慷慨激昂）今天，我们战胜了邪恶，捍卫了正义！但这只是开始，我们将继续捍卫我们的国家，保护我们的人民，直到永远！</p><p>（人群欢呼雀跃，鼓掌致意。）</p><p>（艾莉亚的同伴们，包括一群勇敢的骑士和智慧的法师，围绕着她，表示敬意和支持。）</p><p>（舞台渐渐淡出，留下了一片充满希望和勇气的景象。）</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>'
        },
        {
            sessionId: 3,
            sessionTitle: '场次3',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>（舞台背景是一个被冰雪覆盖的王国，寒风凛冽，冰雪皑皑。在王国的中心是一座宏伟的冰雪城堡，阳光反射在冰雪之上，闪耀着耀眼的光芒。）</p><p>（主角艾莉丝，一名年轻而富有魔法天赋的女巫，站在城堡的前方，凝视着远方。）</p><p>艾莉丝：（低声自语）冰雪之王，你的统治已经太久了。现在是时候结束这一切了。</p><p>（艾莉丝举起手中的法杖，释放出一道强大的魔法能量，向冰雪城堡发起攻击。）</p><p>（突然，一阵冰冷的气息从城堡中涌出，一位神秘的女王，名为艾娜，出现在城堡门前。）</p><p>艾娜：（冷漠地）你是谁？竟敢闯入我的领地？</p><p>艾莉丝：我是艾莉丝，来自自由之地的女巫。我来为人民夺回他们失去的自由，结束你的统治！</p><p>艾娜：（嘲讽地笑）你以为你有能力挑战我？我是冰雪之王，我掌控着冰雪的力量！</p><p>（艾娜释放出强大的冰雪魔法，与艾莉丝展开激烈的魔法对决。）</p><p>（在战斗中，艾莉丝展现出她惊人的魔法天赋，不断用她的智慧和勇气对抗艾娜的冰雪魔法。）</p><p>（最终，艾莉丝利用她的智慧和魔法，成功击败了艾娜，解除了她对王国的统治。）</p><p>艾莉丝：（喘息着，但眼中充满了胜利的喜悦）冰雪之王的统治结束了！现在，人民将重获自由！</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>'
        }
    ]
});
const PlayInfo = () => {
    return {
        state
    };
};

export default PlayInfo;
