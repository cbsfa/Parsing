function Word()
{
    this.type=10;
    this.word=""
}
function isLetter()
{
    return token[point] >= 'a' && token[point] <= 'z' || token[point] >= 'A' && token[point] <= 'Z';
}
function isDigit()
{
    return token[point] >= '0' && token[point] <= '9';
}
function reserve()
{
    let i=0;
    while (keyArray[i]!==KEY_WORD_END)
    {
        if (word.word===keyArray[i]) return i+1;
        i++;
    }
    return 10;
}
function read()
{
    word.word+=token[point++];
}
function readAndSet(type)
{
    read();
    word.type=type;
}
function readAndSetAndSkip(type,length)
{
    for (let i=0;i<length;i++) readAndSet(type);
}
function skip()
{
    while (token[point]===' ') point++;
}
function scanner()
{
    word=new Word();
    skip();
    if (isLetter())
    {
        while (isLetter()||isDigit()) read();
        word.type=reserve();
        if (word.type===10) word.word="'"+word.word+"'";
    }
    else if (isDigit()) while (isDigit()) readAndSet(11);
    else switch (token[point])
        {
            case '+':readAndSet(13);break;
            case '-':readAndSet(14);break;
            case '*':readAndSet(15);break;
            case '/':readAndSet(16);break;
            case ':':
                if (token[point+1]==='=') readAndSetAndSkip(18,2);
                else readAndSet(17);
                break;
            case '<':
                if (token[point+1]==='=') readAndSetAndSkip(21,2);
                else if (token[point+1]==='>') readAndSetAndSkip(22,2);
                else readAndSet(20);
                break;
            case '>':
                if (token[point+1]==='=') readAndSetAndSkip(24,2);
                else readAndSet(23);
                break;
            case '=':readAndSet(25);break;
            case ';':readAndSet(26);break;
            case '(':readAndSet(27);break;
            case ')':readAndSet(28);break;
            case '#':readAndSet(0);break;
            case '\0':word.word="";word.type=1000;break;
        }
    if (word.type<1000)
    {
        process.value+=wordLocation+"."+word.word+"，"+word.type+"\n"
        wordLocation++;
    }
}