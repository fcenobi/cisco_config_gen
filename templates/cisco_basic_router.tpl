!! Generated by {{developer}} - {{local_time}}
service password-encryption
no service pad
no ip forward-protocol nd
no ip source-route
ip dhcp bootp ignore
clock timezone CET 1 0
clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00
service timestamps log datetime localtime show-timezone
logging buffered 4096
no ip http server
no ip http secure-server
{{config_str}}


----------------------------------------------------

!! Generated by ciscoconf.net - Thu, 07 Dec 2017 05:38:27 +0100
service password-encryption
no service pad
no ip forward-protocol nd
no ip source-route
ip dhcp bootp ignore
clock timezone CET 1 0
clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00
service timestamps log datetime localtime show-timezone
logging buffered 4096
no ip http server
no ip http secure-server
hostname router1
ip domain-name lan.local
username admin privilege 15 password admin
no ip bootp server
!
!    /
!   /     If your device doesn't have an RSA key yet, execute the following command:
!  / !!   crypto key generate rsa general-keys modulus 2048
! <------>
ip ssh version 2
ip ssh port 8022 rotary 1
ip local pool VPN 10.1.254.100 10.1.254.110
!
aaa new-model
aaa authentication enable default none
aaa authentication ppp default local
aaa authorization exec default none
aaa authorization commands 0 default none
aaa authorization commands 15 default none
!
ip dhcp pool 10.1.1.0/24
 network 10.1.1.0 /24
 default-router 10.1.1.1
 domain-name lan.local
 dns-server 195.130.131.139
!
ip dhcp pool 10.1.2.0/24
 network 10.1.2.0 /24
 default-router 10.1.2.1
 domain-name lan.local
 dns-server 195.130.131.139
!
vpdn enable
vpdn logging
vpdn logging local
vpdn logging user
!
vpdn-group 1
 accept-dialin
  protocol pptp
  virtual-template 1
!
object-group network PrivateRanges
 192.168.0.0 255.255.0.0
 172.16.0.0 255.240.0.0
 10.0.0.0 255.0.0.0
!
class-map match-any VoIP
 match protocol sip
 match protocol rtp audio
!
policy-map Internet-Output
 class VoIP
  priority 512
 class class-default
  fair-queue
!
policy-map WAN-Output
 class class-default
  shape average 8000000
   service-policy Internet-Output
!
interface GigabitEthernet0/0.1
 encapsulation dot1Q 1
 no ip proxy-arp
 no ip redirects
 ip nat inside
 no ip unreachables
 ip address 10.1.1.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/0.2
 encapsulation dot1Q 2
 no ip proxy-arp
 no ip redirects
 ip nat inside
 no ip unreachables
 ip address 10.1.2.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/0
 no ip proxy-arp
 no shutdown
 no ip unreachables
 no ip redirects
 no mop enabled
!
interface Virtual-Template1
 ip unnumbered GigabitEthernet0/1
 ppp authentication ms-chap-v2
 ip nat inside
 ppp encrypt mppe auto
 peer default ip address pool VPN
!
interface GigabitEthernet0/1
 ip address dhcp
 ip nat outside
 ip access-group Internet-IN in
 service-policy output WAN-Output
 no shutdown
 no ip proxy-arp
 no ip redirects
 no ip unreachables
 no cdp enable
 no mop enabled
!
ip nat inside source list NAT interface GigabitEthernet0/1 overload
!
ip access-list extended SSH
  permit tcp object-group PrivateRanges any eq 22
  permit tcp any any eq 8022
!
ip access-list extended NAT
 deny ip any object-group PrivateRanges
 permit ip any any
!
ip access-list extended Internet-IN
 deny udp any any eq 53
 deny tcp any any eq 53
 permit ip any any
!
line con 0
 logging synchronous
!
line vty 0 15
 logging synchronous
 transport input ssh
 rotary 1
 access-class SSH in
!
ntp server 193.104.37.238
