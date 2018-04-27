let express = require('express');
let config = require('./config/index');
// 当前环境变量下的port，没有的话，就是config.build下的port
let port = process.env.PORT || config.build.port;
let app = express();

let router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});
app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoutes = express.Router();
// errno:0表示数据正常
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});
apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});
app.use('/api', apiRoutes);
app.use(express.static('./dist'));
app.listen(port);
