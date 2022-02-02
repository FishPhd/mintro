export async function forgotPasswordHtml(token: string) {
  return `<!DOCTYPE html>
  <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Reset Password Email</title>
      <meta name="description" content="Reset Password Email Template." />
      <style type="text/css">
        a:hover {
          text-decoration: underline !important;
        }
      </style>
    </head>
  
    <body
      marginheight="0"
      topmargin="0"
      marginwidth="0"
      style="margin: 0px; background-color: #f2f3f8"
      leftmargin="0"
    >
      <!--100% body table-->
      <table
        cellspacing="0"
        border="0"
        cellpadding="0"
        width="100%"
        bgcolor="#f2f3f8"
        style="
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700');
          font-family: 'Poppins', sans-serif;
        "
      >
        <tr>
          <td>
            <table
              style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align: center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="100px"
                    height="100px"
                    viewBox="0 0 500 500"
                  >
                    <defs>
                      <linearGradient
                        id="header-shape-gradient"
                        gradientTransform="rotate(-65)"
                        x2="0.35"
                        y2="1"
                        stroke="20px"
                      >
                        <stop offset="0%" stopColor="#38A169" />
                        <stop offset="25%" stopColor="#48BB78" />
                        <stop offset="50%" stopColor="#68D391" />
                        <stop offset="75%" stopColor="#9AE6B4" />
                        <stop offset="100%" stopColor="#C6F6D5" />
                      </linearGradient>
                    </defs>
                    <path
                      id="M_copy_4"
                      data-name="M copy 4"
                      fill="#9AE6B4"
                      className="cls-1"
                      d="M367.1,18.01q16.621,0,29.166,12.009t12.545,30.574q0,20.5-12.243,31.7T367.1,103.5m29.468-11.2Q384.326,103.5,367.1,103.5m0-85.486q16.621,0,29.166,12.009m0.3,62.274Q384.326,103.5,367.1,103.5m0-85.486q16.621,0,29.166,12.009m0.3,62.274Q384.326,103.5,367.1,103.5m0-85.486q16.621,0,29.166,12.009m0.3,62.274Q384.326,103.5,367.1,103.5m0-85.486q16.621,0,29.166,12.009M370.351,103.5a40.5,40.5,0,0,1-28.714-11.362q-12.091-11.366-12.092-31.54,0-20.811,12.394-31.694A41.828,41.828,0,0,1,370.351,18.01m0,85.486a40.5,40.5,0,0,1-28.714-11.362q-12.091-11.366-12.092-31.54,0-20.811,12.394-31.694A41.828,41.828,0,0,1,370.351,18.01m0,85.486a40.5,40.5,0,0,1-28.714-11.362q-12.091-11.366-12.092-31.54,0-20.811,12.394-31.694A41.828,41.828,0,0,1,370.351,18.01m0,85.486a40.5,40.5,0,0,1-28.714-11.362q-12.091-11.366-12.092-31.54,0-20.811,12.394-31.694A41.828,41.828,0,0,1,370.351,18.01m0,85.486a40.5,40.5,0,0,1-28.714-11.362q-12.091-11.366-12.092-31.54,0-20.811,12.394-31.694A41.828,41.828,0,0,1,370.351,18.01m-239.837,0q-16.621,0-29.166,12.009T88.8,60.593q0,20.5,12.243,31.7t29.468,11.2m-29.468-11.2q12.238,11.209,29.468,11.2m0-85.486q-16.621,0-29.166,12.009m-0.3,62.274q12.238,11.209,29.468,11.2m0-85.486q-16.621,0-29.166,12.009m-0.3,62.274q12.238,11.209,29.468,11.2m0-85.486q-16.621,0-29.166,12.009m-0.3,62.274q12.238,11.209,29.468,11.2m0-85.486q-16.621,0-29.166,12.009M127.261,103.5a40.5,40.5,0,0,0,28.714-11.362q12.092-11.366,12.091-31.54,0-20.811-12.393-31.694A41.828,41.828,0,0,0,127.261,18.01m0,85.486a40.5,40.5,0,0,0,28.714-11.362q12.092-11.366,12.091-31.54,0-20.811-12.393-31.694A41.828,41.828,0,0,0,127.261,18.01m0,85.486a40.5,40.5,0,0,0,28.714-11.362q12.092-11.366,12.091-31.54,0-20.811-12.393-31.694A41.828,41.828,0,0,0,127.261,18.01m0,85.486a40.5,40.5,0,0,0,28.714-11.362q12.092-11.366,12.091-31.54,0-20.811-12.393-31.694A41.828,41.828,0,0,0,127.261,18.01m0,85.486a40.5,40.5,0,0,0,28.714-11.362q12.092-11.366,12.091-31.54,0-20.811-12.393-31.694A41.828,41.828,0,0,0,127.261,18.01m249.8,97.3c13.893,0,25.867,2.64,34.037,8.114s12.257,16.059,12.257,31.751v284.4q0,20.843-9.316,31.015T390.016,480.77q-15.2,0-24.391-10.3t-9.193-30.892l0.053-248.331m-0.053.212s-64.205,181.957-66.086,188.9a80.217,80.217,0,0,1-7.722,19,39.983,39.983,0,0,1-13.761,14.165l-21.54-115.178S309.364,138.5,312.306,132.128a24.8,24.8,0,0,1,13.605-13.24q9.194-3.677,29.54-3.677l22.9,0.121M143.515,191.353s61.851,193.1,64.218,200.044,6.741,13.281,13.115,19,15.2,8.581,26.475,8.581c8.5,0,15.953-2.067,21.836-5.745l-21.59-115.066s-56.854-159.665-59.8-166.04a24.8,24.8,0,0,0-13.6-13.24q-9.194-3.677-29.54-3.677H122.075m21.572,76.25V439.58q0,20.6-9.315,30.892t-23.779,10.3q-15.444,0-24.637-10.3T76.723,439.58v-284.4q0-23.538,12.257-31.751c8.174-5.474,19.352-8.092,33.241-8.092"
                    />
                  </svg>
                </td>
              </tr>
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table
                    width="95%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      max-width: 670px;
                      background: #fff;
                      border-radius: 3px;
                      text-align: center;
                      -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    "
                  >
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 35px">
                        <h1
                          style="
                            color: #1e1e2d;
                            font-weight: 500;
                            margin: 0;
                            font-size: 32px;
                            font-family: 'Rubik', sans-serif;
                          "
                        >
                          You have requested to reset your password
                        </h1>
                        <span
                          style="
                            display: inline-block;
                            vertical-align: middle;
                            margin: 29px 0 26px;
                            border-bottom: 1px solid #cecece;
                            width: 100px;
                          "
                        ></span>
                        <p
                          style="
                            color: #455056;
                            font-size: 15px;
                            line-height: 24px;
                            margin: 0;
                          "
                        >
                          To reset your password, click the following link and
                          follow the instructions.
                        </p>
                        <a
                          href=${process.env.CORS_ORIGIN}/change-password/${token}
                          style="
                            background: #9ae6b4;
                            text-decoration: none !important;
                            font-weight: 500;
                            margin-top: 35px;
                            color: #000;
                            text-transform: uppercase;
                            font-size: 14px;
                            padding: 10px 24px;
                            display: inline-block;
                            border-radius: 50px;
                          "
                          >Reset Password</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
  
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--/100% body table-->
    </body>
  </html>`;
}
