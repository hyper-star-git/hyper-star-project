/*
   netlify専用機能。
   指定フォルダ(デフォルトはnetlify/functions/)内のjsは、サーバー側で動かしてくれる。
*/
exports.handler = async (event, context) => {
  try {
    const { keyword } = JSON.parse(event.body);

    //キーワード & htmlファイル.
    const keywords = {
      "STAR": "pages/keyword_star.html",
      "ﾆｮｮｮｮ": "pages/keyword_nyo.html",
    };
    //URL作成.
    const url = "https://hyper-star-project.netlify.app/" + keywords[keyword?.toUpperCase()];

    //URLがあれば.
    if (url) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, url }),
      };
    } 
    //URLがなければ.
    else {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false }),
      };
    }
  } 
  //エラー.
  catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};