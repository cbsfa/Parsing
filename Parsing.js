function submit()
{
    input=document.getElementById("input");
    process=document.getElementById("process");
    output=document.getElementById("output");
    input.value+="\0";
    process.value="";
    output.value="";
    token=input.value;
    point=0;
    wordLocation=1;
    word=new Word();
    error=0;
    lrparser();
}
function lrparser()
{
    scanner();
    if (word.type===1)
    {
        output.value+=wordLocation-1+".正确\n"
        scanner();
        yucu();
        if (word.type===6)
        {
            output.value+=wordLocation-1+".正确\n"
            scanner();
            if (word.type===0&&error===0)
            {
                output.value+=wordLocation-1+".正确\n"
                alert("成功")
            }
            else
            {
                output.value+=wordLocation+".#错误\n"
                error=1;
            }
        }
        else
        {
            output.value+=wordLocation+".end错误\n"
            error=1;
        }
    }
    else
    {
        output.value+=wordLocation+".begin错误\n"
        error=1;
    }
}
function yucu()
{
    statement();
    while (word.type===26)
    {
        output.value+=wordLocation-1+".正确\n";
        scanner();
        statement();
    }
}
function statement()
{
    if (word.type===10)
    {
        output.value+=wordLocation-1+".正确\n";
        scanner();
        if (word.type===18)
        {
            output.value+=wordLocation-1+".正确\n";
            scanner();
            expression();
        }
        else
        {
            output.value+=wordLocation+".赋值号错误\n"
            error=1;
        }
    }
    else
    {
        output.value+=wordLocation+".输出语句错误\n"
        error=1;
    }
}
function expression()
{
    term();
    while(word.type===13||word.type===14)
    {
        output.value+=wordLocation-1+".正确\n";
        scanner();
        term();
    }
}
function term()
{
    factor();
    while (word.type===15||word.type===16)
    {
        output.value+=wordLocation-1+".正确\n";
        scanner();
        factor();
    }
}
function factor()
{
    if (word.type===10||word.type===11)
    {
        output.value+=wordLocation-1+".正确\n";
        scanner();
    }
    else if (word.type===27)
    {
        output.value+=wordLocation-1+".正确\n";
        scanner();
        expression();
        if (word.type===28)
        {
            output.value+=wordLocation-1+".正确\n";
            scanner();
        }
        else
        {
            output.value+=wordLocation+".输出'）'错误\n";
            error=1;
        }
    }
    else
    {
        output.value+=wordLocation+".表达式错误\n";
        error=1;
    }
}