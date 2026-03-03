/*
   指定フォルダ内のjsは、netlify(サーバー)側で動かしてくれる。
   デフォルトパスは「netlify/functions/」
*/
exports.handler = async (event, context) => {
  try {
    const { keyword } = JSON.parse(event.body);

    //キーワード & htmlファイル.
    const keywords = {
      "STAR": "pages/keyword_star.html",
      "ﾆｮｮｮｮ": "pages/keyword_nyo.html",
    };
    //ファイル取得.
    const matchedUrl = keywords[keyword?.toUpperCase()];
    
    //キーワード正解.
    if (matchedUrl) {
      //URL作成.
      const url = "https://hyper-star-project.netlify.app/" + matchedUrl;
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, url }),
      };
    } 
    //キーワード不正解.
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
