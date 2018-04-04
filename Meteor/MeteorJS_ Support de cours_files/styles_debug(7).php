/** Path: plugin qtype_multichoice .' **/
.que.multichoice .answer .specificfeedback {
    display: inline;
    padding: 0 0.7em;
    background: #FFF3BF;
}
.que.multichoice .answer div.r0,
.que.multichoice .answer div.r1 {
    padding: 0.3em 0 0.3em 25px;
    text-indent: -25px;
}
.que.multichoice .answer div.r0 label,
.que.multichoice .answer div.r1 label,
.que.multichoice .answer div.r0 div.specificfeedback,
.que.multichoice .answer div.r1 div.specificfeedback {
    /* In Chrome and IE, the text-indent above is applied to any embedded table
       cells or <li>s, which screws up the intended layout. This fixes it again. */
    text-indent: 0;
}
.que.multichoice .answer div.r0 input,
.que.multichoice .answer div.r1 input {
    margin: 0 5px;
    padding: 0;
    width: 15px;
}
.dir-rtl .que.multichoice .answer div.r0,
.dir-rtl .que.multichoice .answer div.r1 {
    padding: 0.3em 25px 0.3em 0;
}

/* Editing form. */
body#page-question-type-multichoice div[id^=fitem_id_][id*=answer_] {
    background: #EEE;
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 5px;
    padding-top: 5px;
    border: 1px solid #BBB;
    border-bottom: 0;
}

body#page-question-type-multichoice div[id^=fitem_id_][id*=answer_] .fitemtitle {
    font-weight: bold;
}

body#page-question-type-multichoice div[id^=fitem_id_] .fitemtitle{
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 6px;
    padding-right: 0px;
}

body.dir-rtl#page-question-type-multichoice div[id^=fitem_id_] .fitemtitle {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 6px;
}

body#page-question-type-multichoice div[id^=fitem_id_][id*=fraction_] {
    background: #EEE;
    margin-bottom: 0;
    margin-top: 0;
    padding-bottom: 5px;
    padding-top: 5px;
    border: 1px solid #BBB;
    border-top: 0;
    border-bottom: 0;
}

body#page-question-type-multichoice div[id^=fitem_id_][id*=feedback_] {
    background: #EEE;
    margin-bottom: 2em;
    margin-top: 0;
    padding-bottom: 5px;
    padding-top: 5px;
    border: 1px solid #BBB;
    border-top: 0;
}


