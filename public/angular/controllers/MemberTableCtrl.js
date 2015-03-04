(function(){
	var module = angular.module("listr");

	var MemberCtrl = function($scope, ListrService){
		$scope.selectRow = function(member){
			$scope.selectedMember=member;
		};
		
		$scope.memberSelected = function(member){
			return (member ===$scope.selectedMember)  && $scope.isAdmin? 'selected-tr' : null;
		};
		
		$scope.promoteToAdmin = function(member, group){
			ListrService.promoteUserToAdmin(member.userName, group.id, function(data,status){
				if(status == 200){
					group.admins.push(data);
				}
				else{
					console.log("cannot promote to admin");
				}
				
			});
		};
		
		$scope.removeFromGroup = function(member, group){
			ListrService.removeUserFromGroup(member.userName, group.id, function(data,status){
				if(status==200){
					//remove user from members list
					for(var i= group.members.length-1; i>=0; i--){
						if(group.members[i].userName==member.userName)
							group.members.splice(i,1);
					}
					//if they were an admin, remove from there too
					for(var i= group.admins.length-1; i>=0; i--){
						if(group.admins[i].userName==member.userName)
							group.admins.splice(i,1);
					}
				}
			});
		}
	};	
	module.controller("MemberTableCtrl", MemberCtrl);
}());
