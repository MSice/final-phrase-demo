/*
 * @Author: huangwensong
 * @Date: 2024-03-25 19:17:48
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-27 22:05:59
 * @FilePath: /final-phrase-demo/src/store/palyInfo.ts
 * @Description:
 */
import { ref, reactive } from 'vue';
const Prequel = reactive({
    title: '《魔法遗迹》介绍',
    content: [
        {
            sessionId: 10,
            sessionTitle: '简介（不可编辑）',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>在一个名为阿瓦隆的奇幻王国中，魔法是每个人生活的一部分，它渗透于日常的每个角落，塑造了这个世界的独特风貌。从古老的魔法传统到创新的魔法技艺，阿瓦隆的魔法师们不断探索着魔法的边界和可能性。</p><br><br><p>然而，这个美丽的王国也面临着威胁。在极北之地，一位名为冰雪之王的强大魔法师企图用自己的寒冰魔法统治整个王国，将永恒的寒冬带给阿瓦隆。他的冷酷和野心引发了无数生灵的苦难和恐惧。</p><br><br><p>在这关键时刻，一位年轻的魔法师艾莉亚挺身而出。她不仅熟练掌握了各种魔法技艺，还拥有一颗勇敢而坚定的心。她决心挑战冰雪之王，为阿瓦隆带来和平与繁荣。</p><br><br><p>艾莉亚的冒险之旅充满了艰辛和挑战，但她从未放弃。她穿越茫茫雪原，与各种魔物战斗，不断提升自己的魔法实力。最终，她来到了冰雪之王的宫殿前，与这位强大的敌人展开了一场激烈的魔法对决。</p><br><br><p>经过艰苦的战斗，艾莉亚凭借着她的才华和勇气成功击败了冰雪之王，解除了他对阿瓦隆的威胁。随着冰雪之王的倒下，阿瓦隆重新迎来了春天的气息和希望的光芒。</p><br><br><p>《魔法遗迹》是一部充满奇幻色彩和冒险精神的剧集。它讲述了艾莉亚如何用魔法和勇气保卫自己的家园，成为阿瓦隆王国中的英雄的故事。在这个充满魔法和奇迹的世界里，观众将跟随艾莉亚一起探索未知、战胜困难，感受魔法的魅力和力量。</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div>'
        },
        {
            sessionId: 21,
            sessionTitle: '历史时代（不可编辑）',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>在阿瓦隆王国，全民皆魔法。这是一个绚烂多彩的魔法年代，魔法如同呼吸般自然，渗透于每个角落。从孩童的嬉戏到王者的决策，魔法无处不在，它是力量，是信仰，也是生活的一部分。在这个国度，人们尊敬魔法师，崇尚魔法技艺，每一个阿瓦隆人都在努力探寻魔法的深奥与美丽。这里，既有古老的魔法传统，也有创新的魔法理念，共同交织成一幅瑰丽的魔法画卷。阿瓦隆王国，一个全民魔法的奇幻世界，等待着勇敢的冒险者来揭开它的神秘面纱</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div>'
        },
        {
            sessionId: 32,
            sessionTitle: '主角: 艾丽亚（不可编辑）',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>艾莉亚是阿瓦隆王国中一位年轻而才华横溢的魔法师。她生于这个全民皆魔法的时代，自幼便对魔法充满了无尽的好奇和渴望。在家族的熏陶下，她展现出了非凡的魔法天赋，很快就成为了众人瞩目的焦点。</p><br><br><p>艾莉亚不仅熟练掌握了各种传统魔法，还勇于探索和创新，不断尝试将不同魔法元素融合，创造出独属于自己的新魔法。她的勇敢和智慧使她在魔法界脱颖而出，成为了年轻一代魔法师中的佼佼者。</p><br><br><p>除了魔法技艺，艾莉亚还拥有一颗善良而坚定的心。她深知魔法的力量不仅在于破坏和征服，更在于建设和守护。因此，她立志要用自己的魔法为阿瓦隆王国带来和平与繁荣。</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>'
        },
        {
            sessionId: 43,
            sessionTitle: '反派: 冰雪之王（不可编辑）',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p><strong>冰雪之王</strong></p><br><br><p>冰雪之王，名号为“寒霜主宰”，是阿瓦隆王国极北之地一位强大而冷酷的魔法师。他的存在就如同永恒的寒冬，给周围带来无尽的冰冷与绝望。</p><br><br><p>外貌上，他身着一袭由冰晶和雪花构成的铠甲，眼中透露出冷酷无情的光芒。他的面容如同被千年寒冰所雕刻，没有一丝温度。每当他挥动手中的冰魔法杖，周围的空气都会瞬间凝结，化为凌厉的冰刃或铺天盖地的暴风雪。</p><br><br><p>性格上，冰雪之王冷酷无情，他对弱者的怜悯几乎为零，只相信力量和统治。他渴望将整个阿瓦隆王国都笼罩在自己的寒冰统治之下，让所有生灵都臣服于他的脚下。为了实现这个目标，他不惜与其他魔法师或王国开战，甚至使用黑暗魔法来增强自己的力量。</p><br><br><p>在魔法能力上，冰雪之王精通各种冰雪魔法，从简单的冰冻术到复杂的冰晶结界，他都能运用自如。他的魔法力量之强大，甚至能够改变天候，让整个王国陷入漫长的寒冬之中。</p><br><br><p>然而，冰雪之王的野心并没有得到所有人的认同。他的暴行和冷酷最终引来了勇敢的魔法师艾莉亚的挑战。在这场正与邪的较量中，冰雪之王的命运终将走向终结，而艾莉亚的勇气和智慧则成为了阿瓦隆王国新的希望。</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>'
        },
        {
            sessionId: 54,
            sessionTitle: '背景简介（不可编辑）',
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p>在阿瓦隆王国的极北之地，冰雪之王统治着一片冰封的领土。他是一位冷酷无情的魔法师，以冰雪魔法为武器，肆意蹂躏着周围的土地和生灵。他的存在给阿瓦隆王国带来了无尽的寒冬和苦难。</p><br><br><p>然而，艾莉亚并没有被冰雪之王的淫威所吓倒。她听闻了冰雪之王的恶行，毅然决定挑战这位强大的敌人，为阿瓦隆王国带来春天的希望。</<p>艾莉亚踏上了前往极北之地的征途，她穿越茫茫雪原，克服了无数艰难险阻。在她的坚持和勇气面前，冰雪和寒风也变得不再可怕。</p><br><br><p>终于，艾莉亚来到了冰雪之王的宫殿前。她面对着冰雪之王，毫不畏惧地展现出了自己的魔法实力。她的魔法与冰雪之王的冰雪魔法交织在一起，爆发出耀眼的光芒。</p<p>经过一场激烈的魔法战斗，艾莉亚凭借着她的才华和勇气，成功击败了冰雪之王。随着冰雪之王的倒下，极北之地的冰封逐渐消融，春天的气息开始弥漫。</p><br><br><p>艾莉亚的胜利为阿瓦隆王国带来了希望和温暖。她用自己的魔法和勇气证明了，即使在最寒冷的冰雪之地，也有春天的可能。从此，艾莉亚成为了阿瓦隆王国中的英雄，她的故事被传颂在每一个角落。</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>'
        }
    ]
});
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
            text: '<div class="ql-editor" data-gramm="false" contenteditable="true"><p><em><s>（主角艾莉亚，一名年轻而勇敢的女骑士，手持一把闪闪发光的长剑，穿越森林，来到了这个神秘的遗迹前。）</s></em></p><p>（舞台背景是一个被冰雪覆盖的王国，寒风凛冽，冰雪皑皑。在王国的中心是一座宏伟的冰雪城堡，阳光反射在冰雪之上，闪耀着耀眼的光芒。）</p><p>（主角艾莉丝，一名年轻而富有魔法天赋的女巫，站在城堡的前方，凝视着远方。）</p><p>艾莉丝：（低声自语）冰雪之王，你的统治已经太久了。现在是时候结束这一切了。</p><p>（艾莉丝举起手中的法杖，释放出一道强大的魔法能量，向冰雪城堡发起攻击。）</p><p>（突然，一阵冰冷的气息从城堡中涌出，一位神秘的女王，名为艾娜，出现在城堡门前。）</p><p>艾娜：（冷漠地）你是谁？竟敢闯入我的领地？</p><p>艾莉丝：我是艾莉丝，来自自由之地的女巫。我来为人民夺回他们失去的自由，结束你的统治！</p><p>艾娜：（嘲讽地笑）你以为你有能力挑战我？我是冰雪之王，我掌控着冰雪的力量！</p><p>（艾娜释放出强大的冰雪魔法，与艾莉丝展开激烈的魔法对决。）</p><p>（在战斗中，艾莉丝展现出她惊人的魔法天赋，不断用她的智慧和勇气对抗艾娜的冰雪魔法。）</p><p>（最终，艾莉丝利用她的智慧和魔法，成功击败了艾娜，解除了她对王国的统治。）</p><p>艾莉丝：（喘息着，但眼中充满了胜利的喜悦）冰雪之王的统治结束了！现在，人民将重获自由！</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>'
        }
    ]
});
const PlayInfo = () => {
    return {
        state,
        Prequel
    };
};

export default PlayInfo;
