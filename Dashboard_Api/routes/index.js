const express = require('express')
var router = express.Router();
const app = express();
const cors = require('cors'); // For web security
app.use(cors());
app.use(express.json());
const authMiddleware = require("../middleware/authenticateToken");
const isAdmin = require("../middleware/Adminauth");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
const registerController = require('../controllers').Register;
const loginController = require('../controllers').Login;
const dashboardController = require('../controllers').Dashboard;
const logoutController = require('../controllers').Logout;
const deleteController = require('../controllers').Delete;
const editController = require('../controllers').Edit;
const searchController = require('../controllers').Search
const profileController = require('../controllers').Profile

app.get("/api/all-users", authMiddleware, isAdmin, (req, res) => {
  // only admin can access
});
router.post('/api/register', registerController);
router.post('/api/login', loginController);
router.get('/api/dashboard', authMiddleware, dashboardController);
router.post('/api/logout', authMiddleware, logoutController);
router.delete('/api/delete/:id', authMiddleware, deleteController);
router.put('/api/edit/:id', authMiddleware, editController);
router.get('/api/search', searchController)
router.put('/api/profile/:id', authMiddleware, profileController)
