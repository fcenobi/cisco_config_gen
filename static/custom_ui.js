$(document).on("click", ".removeRow",
	function () {
		// $(this).closest("addinput").remove();
		$(this).parent().remove();
	}
);

$(document).on("click", ".addRow",
	function () {
		var tr = "<span class=\"addinput\" >"
		tr += $(this).parent().parent().find("span.addinput").html();
		tr +=
			'<span class="removeRow" style="font-size:10px;"> <img src="images/list-remove.png"></span>';
		tr += '</span>'
		$(this).parent().parent().append(tr);
	}
);

$(document).on("click", "#clear_event",
	function () {
		$("#generated_config").text("")
	}
);

$(document).on("click", "#run_event",
	function () {
		var text_config = config_template;
		//console.log(text_config);
		//$("#generated_config").text(text_config);
		
		ajaxReadConfig("config_form");
	}
);

var ajaxReadConfig = function(object_id){
	var myform = $('#' + object_id);
    var formdata = new FormData(myform); //only working on the HTML 5, post
    $.ajax({
        url: "/config_analyze",
        data: formdata,
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (rtn_data) {
			console.log(rtn_data)
            console.log("completed summit");
        },
		error : function (rtn_data){
			console.log(rtn_data)
			console.log("error");
		}
    });
}

var readTextFile = function(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

var config_template = "!! Generated by ciscoconf.net - Thu, 07 Dec 2017 05:38:27 +0100\n"
+ "service password-encryption\n"
+ "no service pad\n"
+ "no ip forward-protocol nd\n"
+ "no ip source-route\n"
+ "ip dhcp bootp ignore\n"
+ "clock timezone CET 1 0\n"
+ "clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00\n"
+ "service timestamps log datetime localtime show-timezone\n"
+ "logging buffered 4096\n"
+ "no ip http server\n"
+ "no ip http secure-server\n"
+ "hostname router1\n"
+ "ip domain-name lan.local\n"
+ "username admin privilege 15 password admin\n"
+ "no ip bootp server\n"
+ "!          \n"
+ "!    /\    \n"
+ "!   /  \   If your device doesn't have an RSA key yet, execute the following command:\n"
+ "!  / !! \  crypto key generate rsa general-keys modulus 2048\n"
+ "! <------>  \n"
+ "ip ssh version 2\n"
+ "ip ssh port 8022 rotary 1\n"
+ "ip local pool VPN 10.1.254.100 10.1.254.110\n"
+ "!\n"
+ "aaa new-model\n"
+ "aaa authentication enable default none\n"
+ "aaa authentication ppp default local\n"
+ "aaa authorization exec default none\n"
+ "aaa authorization commands 0 default none\n"
+ "aaa authorization commands 15 default none\n"
+ "!\n"
+ "ip dhcp pool 10.1.1.0/24\n"
+ " network 10.1.1.0 /24\n"
+ " default-router 10.1.1.1\n"
+ " domain-name lan.local\n"
+ " dns-server 195.130.131.139\n"
+ "!\n"
+ "ip dhcp pool 10.1.2.0/24\n"
+ " network 10.1.2.0 /24\n"
+ " default-router 10.1.2.1\n"
+ " domain-name lan.local\n"
+ " dns-server 195.130.131.139\n"
+ "!\n"
+ "vpdn enable\n"
+ "vpdn logging\n"
+ "vpdn logging local\n"
+ "vpdn logging user\n"
+ "!\n"
+ "vpdn-group 1\n"
+ " accept-dialin\n"
+ "  protocol pptp\n"
+ "  virtual-template 1\n"
+ "!\n"
+ "object-group network PrivateRanges\n"
+ " 192.168.0.0 255.255.0.0\n"
+ " 172.16.0.0 255.240.0.0\n"
+ " 10.0.0.0 255.0.0.0\n"
+ "!\n"
+ "class-map match-any VoIP\n"
+ " match protocol sip\n"
+ " match protocol rtp audio\n"
+ "!\n"
+ "policy-map Internet-Output\n"
+ " class VoIP\n"
+ "  priority 512\n"
+ " class class-default\n"
+ "  fair-queue\n"
+ "!\n"
+ "policy-map WAN-Output\n"
+ " class class-default\n"
+ "  shape average 8000000\n"
+ "   service-policy Internet-Output\n"
+ "!\n"
+ "interface GigabitEthernet0/0.1\n"
+ " encapsulation dot1Q 1\n"
+ " no ip proxy-arp\n"
+ " no ip redirects\n"
+ " ip nat inside\n"
+ " no ip unreachables\n"
+ " ip address 10.1.1.1 255.255.255.0\n"
+ " no shutdown\n"
+ "!\n"
+ "interface GigabitEthernet0/0.2\n"
+ " encapsulation dot1Q 2\n"
+ " no ip proxy-arp\n"
+ " no ip redirects\n"
+ " ip nat inside\n"
+ " no ip unreachables\n"
+ " ip address 10.1.2.1 255.255.255.0\n"
+ " no shutdown\n"
+ "!\n"
+ "interface GigabitEthernet0/0\n"
+ " no ip proxy-arp\n"
+ " no shutdown\n"
+ " no ip unreachables\n"
+ " no ip redirects\n"
+ " no mop enabled\n"
+ "!\n"
+ "interface Virtual-Template1\n"
+ " ip unnumbered GigabitEthernet0/1\n"
+ " ppp authentication ms-chap-v2\n"
+ " ip nat inside\n"
+ " ppp encrypt mppe auto\n"
+ " peer default ip address pool VPN\n"
+ "!\n"
+ "interface GigabitEthernet0/1\n"
+ " ip address dhcp\n"
+ " ip nat outside\n"
+ " ip access-group Internet-IN in\n"
+ " service-policy output WAN-Output\n"
+ " no shutdown\n"
+ " no ip proxy-arp\n"
+ " no ip redirects\n"
+ " no ip unreachables\n"
+ " no cdp enable\n"
+ " no mop enabled\n"
+ "!\n"
+ "ip nat inside source list NAT interface GigabitEthernet0/1 overload\n"
+ "!\n"
+ "ip access-list extended SSH\n"
+ "  permit tcp object-group PrivateRanges any eq 22\n"
+ "  permit tcp any any eq 8022\n"
+ "!\n"
+ "ip access-list extended NAT\n"
+ " deny ip any object-group PrivateRanges\n"
+ " permit ip any any\n"
+ "!\n"
+ "ip access-list extended Internet-IN\n"
+ " deny udp any any eq 53\n"
+ " deny tcp any any eq 53\n"
+ " permit ip any any\n"
+ "!\n"
+ "line con 0\n"
+ " logging synchronous\n"
+ "!\n"
+ "line vty 0 15\n"
+ " logging synchronous\n"
+ " transport input ssh\n"
+ " rotary 1\n"
+ " access-class SSH in\n"
+ "!\n"
+ "ntp server 193.104.37.238\n"
+ ""