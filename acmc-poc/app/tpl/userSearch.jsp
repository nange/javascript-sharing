<header id="top">
    <div class="container">
      <div class="header-box">
        <a href="/">
          <img src="img/logo.png">
        </a>
      </div>
    </div>
  </header>


<main class="container">
  <div class="wrap">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">USER SEARCH CRITERIA</h3>
      </div>
      <div class="panel-body">
        <form class="form-horizontal" action="" method="post">
          <div class="form-group">
            <label for="userno" class="col-md-4">User Number</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="userno" ng-model="user.userno" title="<%=1+1%>">
            </div>
          </div>
          <div class="form-group">
            <label for="email" class="col-md-4">Email Address</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="email" ng-model="user.email">
            </div>
          </div>
          <div class="form-group">
            <label for="firstname" class="col-md-4">First Name</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="firstname" ng-model="user.firstname">
            </div>
          </div>
          <div class="form-group">
            <label for="lastname" class="col-md-4">Last name</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="lastname" ng-model="user.lastname">
            </div>
          </div>
          <div class="form-group">
            <label for="phoneno" class="col-md-4">Phone Number</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="phoneno" ng-model="user.phoneno">
            </div>
          </div>
          <div class="form-group">
            <label for="mcn" class="col-md-4">Master Customer Name</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="mcn" ng-model="user.mcn">
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-8 col-md-offset-4">
              <button class="btn btn-success" ng-click="search()">Search</button>
              <div class="space"></div>
              <button class="btn btn-warning" ng-click="reset()" >Clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="panel panel-default table-dynamic" ng-show="show">
      <div class="panel-heading">
        <h3 class="panel-title">USER SEARCH RESULTS</h3>
      </div>
      <div class="panel-body">
        <table class="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>
                <div class="th">
                  User Number
                  <span class="glyphicon glyphicon-chevron-up" ng-click="order('userno')" ng-class="{active: row == 'userno'}"></span>
                  <span class="glyphicon glyphicon-chevron-down" ng-click="order('-userno')" ng-class="{active: row == '-userno'}"></span>
                </div>
              </th>
              <th>
                <div class="th">
                  Email Address
                  <span class="glyphicon glyphicon-chevron-up"></span>
                  <span class="glyphicon glyphicon-chevron-down"></span>
                </div>
              </th>
              <th>
                <div class="th">
                  First Name
                  <span class="glyphicon glyphicon-chevron-up"></span>
                  <span class="glyphicon glyphicon-chevron-down"></span>
                </div>
              </th>
              <th>
                <div class="th">
                  Last name
                  <span class="glyphicon glyphicon-chevron-up"></span>
                  <span class="glyphicon glyphicon-chevron-down"></span>
                </div>
              </th>
              <th>
                <div class="th">
                  Phone Number
                  <span class="glyphicon glyphicon-chevron-up"></span>
                  <span class="glyphicon glyphicon-chevron-down"></span>
                </div>
              </th>
              <th>
                <div class="th">
                  Master Customer Name
                  <span class="glyphicon glyphicon-chevron-up"></span>
                  <span class="glyphicon glyphicon-chevron-down"></span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="user in results | orderBy: order">
              <td>{{user.userno}}</td>
              <td>{{user.email}}</td>
              <td>{{user.firstname}}</td>
              <td>{{user.lastname}}</td>
              <td>{{user.phoneno}}</td>
              <td>{{user.mcn}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>

<footer id="footer"></footer>