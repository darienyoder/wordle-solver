const wordList = ["about","above","abuse","actor","acute","admit","adopt","adult","after","again","agent","agree","ahead","alarm","album","alert","alike","alive","allow","alone","along","alter","among","anger","Angle","angry","apart","apple","apply","arena","argue","arise","array","aside","asset","audio","audit","avoid","award","aware","badly","baker","bases","basic","basis","beach","began","begin","begun","being","below","bench","billy","birth","black","blame","blind","block","blood","board","boost","booth","bound","brain","brand","bread","break","breed","brief","bring","broad","broke","brown","build","built","buyer","cable","calif","carry","catch","cause","chain","chair","chart","chase","cheap","check","chest","chief","child","china","chose","civil","claim","class","clean","clear","click","clock","close","coach","coast","could","count","court","cover","craft","crash","cream","crime","cross","crowd","crown","curve","cycle","daily","dance","dated","dealt","death","debut","delay","depth","doing","doubt","dozen","draft","drama","drawn","dream","dress","drill","drink","drive","drove","dying","eager","early","earth","eight","elite","empty","enemy","enjoy","enter","entry","equal","error","event","every","exact","exist","extra","faith","false","fault","fiber","field","fifth","fifty","fight","final","first","fixed","flash","fleet","floor","fluid","focus","force","forth","forty","forum","found","frame","frank","fraud","fresh","front","fruit","fully","funny","giant","given","glass","globe","going","grace","grade","grand","grant","grass","great","green","gross","group","grown","guard","guess","guest","guide","happy","harry","heart","heavy","hence","henry","horse","hotel","house","human","ideal","image","index","inner","input","issue","japan","jimmy","joint","jones","judge","known","label","large","laser","later","laugh","layer","learn","lease","least","leave","legal","level","lewis","light","limit","links","lives","local","logic","loose","lower","lucky","lunch","lying","magic","major","maker","march","maria","match","maybe","mayor","meant","media","metal","might","minor","minus","mixed","model","money","month","moral","motor","mount","mouse","mouth","movie","music","needs","never","newly","night","noise","north","noted","novel","nurse","occur","ocean","offer","often","order","other","ought","paint","panel","paper","party","peace","peter","phase","phone","photo","piece","pilot","pitch","place","plain","plane","plant","plate","point","pound","power","press","price","pride","prime","print","prior","prize","proof","proud","prove","queen","quick","quiet","quite","radio","raise","range","rapid","ratio","reach","ready","refer","right","rival","river","robin","roger","roman","rough","round","route","royal","rural","scale","scene","scope","score","sense","serve","seven","shall","shape","share","sharp","sheet","shelf","shell","shift","shirt","shock","shoot","short","shown","sight","since","sixth","sixty","sized","skill","sleep","slide","small","smart","smile","smith","smoke","solid","solve","sorry","sound","south","space","spare","speak","speed","spend","spent","split","spoke","sport","staff","stage","stake","stand","start","state","steam","steel","stick","still","stock","stone","stood","store","storm","story","strip","stuck","study","stuff","style","sugar","suite","super","sweet","table","taken","taste","taxes","teach","teeth","terry","texas","thank","theft","their","theme","there","these","thick","thing","think","third","those","three","threw","throw","tight","times","tired","title","today","topic","total","touch","tough","tower","track","trade","train","treat","trend","trial","tried","tries","truck","truly","trust","truth","twice","under","undue","union","unity","until","upper","upset","urban","usage","usual","valid","value","video","virus","visit","vital","voice","waste","watch","water","wheel","where","which","while","white","whole","whose","woman","women","world","worry","worse","worst","worth","would","wound","write","wrong", "parer", "foyer", "riper", "joker", "mummy", "cater", "coyly", "trite", "jazzy", "nanny"];

const difficultWords = ["wound", "joker", "lower", "night", "right"];

var greenLetters = [0, 0, 0, 0, 0];
var yellowLetters = [];
var yellowLetterIndexes = [];
var greyLetters = [];

var output;

function getBestWord()
{
    let wordScores = [];
    for (var wordIndex = 0; wordIndex < wordList.length; wordIndex++)
    {
        let word = wordList[wordIndex];
        let score = 0;
        for (var letterIndex = 0; letterIndex < word.length; letterIndex++)
        {
	        // If the word contains any letters that are confirmed to not be in the answer,
            // set the score extremely low
            if (getGreyLetters().includes(word[letterIndex]))
                score = -999999999;
            // Otherwise, increase the word's score by how often that letter
            // appears in that position in every word in the dictionary
            else
                score += letterPositionalFrequency(word[letterIndex], letterIndex);

            // If the word does not have a green letter in its marked spot
	        // set the score extremely low
            if (isLetterGreen(letterIndex))
                if (word[letterIndex] != getGreenLetter(letterIndex))
                    score = -999999999;

            for (var i = 0; i < yellowLetters.length; i++)
            {
                if (yellowLetterIndexes[i] == letterIndex)
                    if (yellowLetters[i] == word[letterIndex])
                        score = -999999999;
            }
        }
	    // If the word does not have a yellow letter anywhere
	    // set the score extremely low
        for (yellowLetter of getYellowLetters())
            if (!word.includes(yellowLetter))
                score = -999999999;

        wordScores.push(score);
    }
    // Return the word with the highest score
    return wordList[wordScores.indexOf(Math.max(...wordScores))];
}

function isLetterGreen(index)
{
    return greenLetters[index] != 0;
}

function getGreenLetter(index)
{
    return greenLetters[index];
}

function getYellowLetters()
{
    return yellowLetters;
}

function getGreyLetters()
{
    return greyLetters;
}

// Add up every occurance of a letter in the given index of every word in the word list
function letterPositionalFrequency(letter, index)
{
	let score = 0;
	for (word of wordList)
		if (letter == word[index])
			score += 1;
	return score;
}

// UNUSED
// Add up every occurance of a letter in every word in the word list
// This function is no more effective than letterPositionalFrequency() but is 6 times slower
function letterTotalFrequency(letter)
{
    let score = 0;
    for (word of wordList)
        for (wordLetter in word)
            if (letter == wordLetter)
                score += 1;
    return score;
}

function solveWord(newWord = "")
{
    output = document.getElementById("output");
    output.innerHTML = "";
    // for (var i = 0; i < wordList.length; i++)
    // {
        let printText = "";
        let keyWord = newWord;
	if (keyWord == "")
	    keyWord = wordList[Math.floor(Math.random() * wordList.length)];
	else
	    wordList.push(keyWord);
        let solved = false;
        greenLetters = [0, 0, 0, 0, 0];
        yellowLetters = [];
        yellowLetterIndexes = [];
        greyLetters = [];
        for (var guessCount = 0; guessCount < 6; guessCount++)
        {
            printText += "<br>" + (guessCount + 1) + "."
            let guess = getBestWord();
            for (var letterIndex = 0; letterIndex < guess.length; letterIndex++)
            {
                if (guess[letterIndex] == keyWord[letterIndex])
                {
                    greenLetters[letterIndex] = keyWord[letterIndex];
                    printText += "&nbsp;[" + guess[letterIndex] +"]";
                }
                else if (keyWord.includes(guess[letterIndex]))
                {
                    yellowLetters.push(guess[letterIndex]);
                    yellowLetterIndexes.push(letterIndex);
                    printText += "&nbsp;&lt;" + guess[letterIndex] +"&gt;";
                }
                else
                {
                    greyLetters.push(guess[letterIndex])
                    printText += "&nbsp;&nbsp;" + guess[letterIndex] +"&nbsp;";
                }
            }
            if (guess == keyWord)
            {
                solved = true;
                break;
            }
        }
        printText += "<br><br>&nbsp;Word was " + keyWord + "<br><br>";

        if (!solved)
        {
            printText = "<span style='background-color:pink;'>" + printText + "</span>";
            unsolvedWords.push(keyWord);
        }

        output.innerHTML += printText;
    // }

    return 0;
}
