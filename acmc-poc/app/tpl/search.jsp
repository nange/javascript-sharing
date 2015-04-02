<c:set var="form" value="${result}"/>

<div class="page">
	<section class="panel panel-default">
		<div class="panel-heading">
			<strong><span class="glyphicon glyphicon-th"></span>${form.title}</strong>
		</div>
		<div class="panel-body">
			<form action="" class="form-horizontal" >
				<c:forEach items="form.fields" var="field">

					<div class="form-group">
						<label for="" class="col-sm-3">${field.label}</label>
						<div class="col-sm-9">
							<c:choose>
							<c:when test="${field.type eq 'text'}">
								<input type="text" class="form-control" ng-model="${field.name}">
							</c:when>
							<c:when test="${field.type eq 'select'}">
								<span class="ui-select">
									<select ng-model="${field.name}">
										<option value="">Empty</option>
									</select>
								</span>
							</c:when>
							<c:when test="${field.type eq 'date'}">
								<div class="input-group ui-datepicker">
									<input type="text" 
										   class="form-control"
										   datepicker-popup="{{format}}"
										   ng-model="${field.name}"
										   is-open="opened"
										   datepicker-options="dateOptions" 
										   date-disabled="disabled(date, mode)"
										   close-text="Close">
									<span class="input-group-addon" ng-click="open($event)">
										<i class="fa fa-calendar"></i>
									</span>
								</div>
							</c:when>
							</c:choose>
						</div>
					</div>

				</c:forEach>
				<div class="form-group">
					<div class="col-sm-8 col-sm-offset-3">
						<button class="btn btn-success" ng-click="search()">Search</button>
						<div class="space"></div>
						<button class="btn btn-warning" ng-click="reset()">Clear</button>
					</div>
				</div>
			</form>
		</div>
	</section>

	<section class="panel panel-default table-dynamic">
		<div class="panel-heading">
			<strong><span class="glyphicon glyphicon-th"></span> Search Result</strong>
		</div>
		<table class="table table-bordered table-responsive">
			<thead>
			  <tr>
			  	<c:forEach items="form.returnFields" var="returnField">
				<th>
				  <div class="th">
					${returnField.description}
					<span class="glyphicon glyphicon-chevron-up"></span>
					<span class="glyphicon glyphicon-chevron-down"></span>
				  </div>
				</th>
				</c:forEach>
			  </tr>
			</thead>
		</table>
	</section>

</div>
