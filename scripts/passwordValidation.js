testCase = "ebf3d2a3c1577ca282491a7f8b5c548bb5f1b294a360c976ab46da36199b41d89f525a9d57a9f3c8a7735e1481bf18539cf43f6e15f47981b3501a1dcac470b70b8b2cdb9a96d9408940f417b20eb6f80344a0ad4a2cdc87566be629f53fb5e0ce75d2c6ec5078299577ee71dee4d0999c9d4212d532a4957d3d8572ce05a8e3b33a0a1167f2d4e22fabd10f4ab61328d96d81b41638f2e8585f724f4a8ca9a902396eb401b808e74836eada64142f2944a90bade780be5668bd2e6fcabc69eff9043d1d337d3504f2f1f27f1a7e90304fa31104f350d23e8a215aab86b894984fc10928190df213f3044c1461b22361eac9439ebde0f746830fa0baba78d7da4540fef48d6d2b0eb32fd284bcfdfe289ca54dc01050110a2fdb33b0d6d0d957109c73786285d18b46f0ea34d8bffcc598a170a4e7170e8b4ba1a601ebeb583f30face1c56230f092ac0313b8e7aebb7a320e21cdf4a2cc58f0e6fa381d3a243734060e6761d6c462f53f74e2ae09c0b197b397579f39ff9d4ed20d7d8f991edcb3fb148db1559319838744f797e31b3f240a859b9ec0551594a43861dd944ae65c53ee02ab31efd2311447c77d1f31bc7e47245641208fdc0b34d119ccf6bdbe55b38951263ce64c546a04b67453645bbcc359e64643a0094973ebb3cd5ea98343798b932b49d983b96ce46b839e1d59309569b8f1ebff2bbbe0c9f663aaab2e08c5451f443ccafe3db8c70796d4251340aaa5164cf9b3bc403c15c3d4a6092fbe08308c028ec5d19eda5624c33dbf39961fef5bc52acbaf4782b51ebdc4cf7a6eab2b866eee0445f16887647050df66643600cef22be114b9734bbcae2ab4ef13cc4a47365278d38ec1a28da032900946657289af2dc5ed416c8336f66de5fc3a7980a6aebb88c5cee42f1daf7645885140895435b4c3ee73486108d2f23a6596b327d2ca7c89857f54df390910890cb2a59c389f2df0cb786ce314e02d7b64a4a538b9b2b5b55cf4dc8c82b7e659eb3bc30cd0524d9ddbae0e44fe2ee0c8719bcfb3594a76ae50013035ba91f0048d513848c83919e5b3066eae7358af8a2145d966d53302aab46fcc6625f91ccb1cfa9c16e9b444f778e15aef821400f392a3047946cdb8a19ee7d977e9f54d9763065d938d1e3cd17db83344734b790a83277abeb1424ba41ad957fa73374e978379527f6854416d2622167c0415c115014e4a37acc3e02aadbf6305cdf5374686edc279c3b383ba57eaa798a37ed5f99fe3f3831a975bdf5ff4b14ce0644cb8e8e46eb746bc901c2bce3e10d28b3d48d05214d58e9ce444c78ae7240ff91491120692943262dcc9c7680ace58241607ec2a1f064a8b564c1c470c6530911a5905135c4cb825221b8ecc95ace8ca12b07406c24c324f36577d887b263811b8c60a99c0a09772ccb5601af310ba3e71202fcbea43f3a2937a4ee8a12683466e60312e0a3991dd6b9690bbe570cfa12badfcf4407fd66d1d7ced14df1fc5fc4ebfa59ce721cbafce702f6b67b34bb3b80b947b950b9ae9f075ceb96a2c7fae9b8646d45a4b09084f4bd6fa471f7434b4e938bc37c08ad247b07d8a0202ea0990e8ec5724bd3d15a1b5f8554826bfe0cd02057a862c1eb05098111c28b7263c1a628dcb5e7ac7a55962fd8a8eaad325a7c4f5ff0a8aafca06ff166211b45df229b4f7b835d84c06580be7a0663a62fff118e7287883b52160b489d0be638733d9c7502981a11d737f68a6153b1f9446eda22af2ac75955643229ec2b4016d0104d16574dbe883698dab02d1cffccf6baf44d73a934c0745190a2639efa41a09e02d586d3984421db767aa711e711603135f3cc1223ed4ef8b994f1c922c98adbfeb7b2063cf7b7f770cb5f5d3d9011d7de115f121646cdec79b01acdce14391d14777bcd34addf4d0697e0d095621293422b4ec0bb91ce3093822fcce7bffbf8d06178425ae8dff2524367e2268b9e725cd8"
const SALT = "7e7610a1628c19f6d53bfbaee6f92f59"

if (localStorage.getItem("passkey") == null) {
    alert("Please Login to Access!")
    window.location.replace('/');
}

var hashPass = localStorage.getItem("passkey")
decode(testCase, hashPass, SALT).then(
result => {

if (!result.success) {
    alert("Please Login to Access!")
    window.location.replace('/');
}});