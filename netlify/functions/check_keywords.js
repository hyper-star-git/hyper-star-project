/*
   指定フォルダ内のjsは、netlify(サーバー)側で動かしてくれる。
   デフォルトパスは「netlify/functions/」
*/
exports.handler = async (event, context) => {
  try {
    const { keyword } = JSON.parse(event.body);

    //キーワード & htmlファイル.
    //ファイル名を特定されないよう、後ろに意味のない8文字を付けている.
    const keywords = {
      "STAR": "pages/kw_star_f3a91c8x.html",
      "ﾆｮｮｮｮ": "pages/kw_nyo_7d2k91ax.html",
      "LV32到達！": "pages/kw_lv32_91a7xk3v.html",
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
