var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
// Importing DB query functions
var cs = require("./functions/queries.ts");
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// --------------- Routes --------------------
app.get("/", function (req, res) {
    res.render("home");
});
// ---------------Create----------------------
app.get("/create", function (req, res) {
    res.render("create");
});
app.post("/create", function (req, res) {
    var _a = req.body, stockcode = _a.stockcode, stockname = _a.stockname, quantity = _a.quantity, price = _a.price;
    cs.createStock({ stockcode: stockcode, stockname: stockname, quantity: quantity, price: price });
    // cs.print()
    res.send("Stock created successfully");
});
// ----------------View ---------------------
app.get("/view", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cs.viewAllstocks()];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/view/:stockCode", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stockcode, viewOne;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stockcode = req.params.stockCode;
                    return [4 /*yield*/, cs.viewOnestock(stockcode)];
                case 1:
                    viewOne = _a.sent();
                    res.json(viewOne);
                    return [2 /*return*/];
            }
        });
    });
});
//---------------- Update -------------------- 
app.get("/update", function (req, res) {
    res.render("update_post");
    var stockcode = req.params.stockCode;
});
app.post("/update", function (req, res) {
    var _a = req.body, stockcode = _a.stockcode, stockname = _a.stockname, quantity = _a.quantity, price = _a.price;
    cs.updateStock({ stockcode: stockcode, stockname: stockname, quantity: quantity, price: price });
    res.send("Updated stock successfully");
});
// ------------- Delete ----------------
app.get("/delete", function (req, res) {
    res.render("delete");
});
app.post("/delete", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stockCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stockCode = req.body.stockcode;
                    return [4 /*yield*/, cs.deleteStock(stockCode)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, res.send("Stock deleted successfully")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
