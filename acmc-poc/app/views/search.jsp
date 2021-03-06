<%@ include file="/includes/prelude.jspf" %>

<c:set var="form" value="${result}"/>

<div class="page" ng-controller="searchCtrl">
	<section class="panel panel-default">
		<div class="panel-heading">
			<strong><span class="glyphicon glyphicon-th"></span>${form.title}</strong>
		</div>
		<div class="panel-body">
			<form action="" class="form-horizontal" >
				<input type="hidden" class="form-control" ng-model="searchParams.searchType" value="${field.type}">
				<input type="hidden" class="form-control" ng-model="searchParams['@class']" value="acp.search.bean.SearchRequest">
				<c:forEach items="${form.fields}" var="field" varStatus="vs">

					<div class="form-group">
						<label for="" class="col-sm-3">${field.label}</label>
						<div class="col-sm-9">
							<c:choose>
							<c:when test="${field.type eq 'text'}">
								<input type="text" class="form-control" ng-model="searchParams.searchFields[${vs.index}].value">
							</c:when>
							<c:when test="${field.type eq 'select'}">
								<span class="ui-select">
									<select ng-model="searchParams.searchFields[${vs.index}].value">
										<option value="">Empty</option>
									</select>
								</span>
							</c:when>
							<c:when test="${field.type eq 'date'}">
								<div class="input-group ui-datepicker">
									<input type="text" 
										   class="form-control"
										   datepicker-popup="{{format}}"
										   ng-model="searchParams.searchFields[${vs.index}].value"
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
							<input type="hidden" class="form-control" ng-model="searchParams.searchFields[${vs.index}].name" value="${field.name}">
							<input type="hidden" class="form-control" ng-model="searchParams.searchFields[${vs.index}].action" value="${field.defaultAction.name}">
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

	<section class="panel panel-default table-dynamic" ng-show="show">
		<div class="panel-heading">
			<strong><span class="glyphicon glyphicon-th"></span> Search Result</strong>
		</div>
		<table class="table table-bordered table-responsive">
			<thead>
			  <tr>
			  	<c:forEach items="${form.returnFields}" var="returnField">
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
			<tbody>
              <tr ng-repeat="result in results">
              	<c:forEach items="${form.returnFields}" var="returnField">
                	<td>{{ result.${returnField.name} }}</td>
                </c:forEach>
              </tr>
            </tbody>
		</table>
	</section>

</div>
